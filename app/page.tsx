import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Features from "@/components/Features";
import ConsultSection from "@/components/ConsultSection";
import ExhibitorSection from "@/components/ExhibitorSection";
import Footer from "@/components/Footer";
import sql from "@/lib/db";

type Exhibitor = {
  external_id: string;
  company_name: string;
  country: string | null;
  booth_no: string | null;
  hall_no: string | null;
  logo_url: string | null;
};

export default async function Home() {
  let exhibitors: Exhibitor[] = [];
  let exhibitorCount = 0;
  let exhibitorLoadFailed = false;

  try {
    exhibitors = (await sql`
      SELECT
        external_id,
        company_name,
        country,
        booth_no,
        hall_no,
        logo_url
      FROM exhibitors
      ORDER BY company_name
      LIMIT 6
    `) as unknown as Exhibitor[];

    const countResult = (await sql`
      SELECT COUNT(*)::int AS count
      FROM exhibitors
    `) as unknown as { count: number }[];

    exhibitorCount = countResult[0]?.count ?? 0;
  } catch {
    exhibitorLoadFailed = true;
  }

  return (
    <main>
      <Navbar exhibitorCount={exhibitorCount} />

      <Hero />

      <Products />

      <Features />

      <ConsultSection />

      <ExhibitorSection
        exhibitors={exhibitors}
        loadFailed={exhibitorLoadFailed}
      />

      <Footer exhibitorCount={exhibitorCount} />
    </main>
  );
}