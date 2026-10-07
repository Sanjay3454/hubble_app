import { NextResponse } from "next/server";
import sql from "@/lib/db";

const GRAPHQL_URL = "https://mmiconnect.in/graphql";

const QUERY = `
  query getExhibitorListForGroup(
    $where: [WhereExpression!],
    $first: Int,
    $after: Int,
    $group: String
  ) {
    catalogueQueries {
      exhibitorsWithWishListGroup(
        first: $first
        where: $where
        after: $after
        group: $group
      ) {
        totalCount
        exhibitors {
          customer {
            id
            companyName
            country
            squareLogo
            userId
            showId

            exhibitorDetail {
              boothNo
              hallNo
            }

            show {
              showName
              startDate
              endDate
            }
          }
        }
      }
    }
  }
`;

export async function POST() {
  try {
    const batchSize = 100;

    let after = -1;
    let totalCount = 0;
    let processed = 0;

    while (true) {
      const response = await fetch(GRAPHQL_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          operationName: "getExhibitorListForGroup",

          query: QUERY,

          variables: {
            where: [],
            first: batchSize,
            after,
            group: "ep-blr-2026",
          },
        }),

        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `MMI request failed: ${response.status}`
        );
      }

      const json = await response.json();

      const result =
        json.data?.catalogueQueries?.exhibitorsWithWishListGroup;

      if (!result) {
        throw new Error("Invalid MMI response");
      }

      totalCount = result.totalCount;

      const exhibitors = result.exhibitors ?? [];

      if (exhibitors.length === 0) {
        break;
      }

      for (const item of exhibitors) {
        const customer = item.customer;

        if (!customer?.id || !customer?.companyName) {
          continue;
        }

        const detail = customer.exhibitorDetail;
        const show = customer.show;

        await sql`
          INSERT INTO exhibitors (
            external_id,
            company_name,
            country,
            logo_url,
            user_id,
            show_id,
            booth_no,
            hall_no,
            show_name,
            show_start,
            show_end,
            updated_at
          )
          VALUES (
            ${String(customer.id)},
            ${customer.companyName.trim()},
            ${customer.country ?? null},
            ${customer.squareLogo ?? null},
            ${customer.userId ?? null},
            ${customer.showId ?? null},
            ${detail?.boothNo ?? null},
            ${detail?.hallNo ?? null},
            ${show?.showName ?? null},
            ${show?.startDate ?? null},
            ${show?.endDate ?? null},
            CURRENT_TIMESTAMP
          )

          ON CONFLICT (external_id)
          DO UPDATE SET
            company_name = EXCLUDED.company_name,
            country = EXCLUDED.country,
            logo_url = EXCLUDED.logo_url,
            user_id = EXCLUDED.user_id,
            show_id = EXCLUDED.show_id,
            booth_no = EXCLUDED.booth_no,
            hall_no = EXCLUDED.hall_no,
            show_name = EXCLUDED.show_name,
            show_start = EXCLUDED.show_start,
            show_end = EXCLUDED.show_end,
            updated_at = CURRENT_TIMESTAMP
        `;
      }

      processed += exhibitors.length;

      console.log(
        `Processed ${processed} / ${totalCount}`
      );

      if (processed >= totalCount) {
        break;
      }

      after += exhibitors.length;
    }

    return NextResponse.json({
      success: true,
      totalCount,
      processed,
    });
  } catch (error) {
    console.error("Scraper error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to scrape exhibitors",
      },
      { status: 500 }
    );
  }
}