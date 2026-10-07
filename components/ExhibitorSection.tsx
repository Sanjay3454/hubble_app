type Exhibitor = {
  external_id: string;
  company_name: string;
  country: string | null;
  booth_no: string | null;
  hall_no: string | null;
  logo_url: string | null;
};

type Props = {
  exhibitors: Exhibitor[];
  loadFailed: boolean;
};

export default function ExhibitorSection({ exhibitors, loadFailed }: Props) {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Exhibitors
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Explore event exhibitors.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Live exhibitor data loaded from our database.
          </p>
        </div>

        {loadFailed || exhibitors.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-slate-600" role="status">
            {loadFailed
              ? "Exhibitor information is temporarily unavailable. Please check back soon."
              : "No exhibitor information is available right now."}
          </p>
        ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {exhibitors.map((exhibitor) => (
            <div
              key={exhibitor.external_id}
              className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              {exhibitor.logo_url ? (
                <img
                  src={exhibitor.logo_url}
                  alt={exhibitor.company_name}
                  className="h-14 w-14 rounded-xl object-contain"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-950 font-bold text-white">
                  {exhibitor.company_name.charAt(0)}
                </div>
              )}

              <h3 className="mt-5 break-words text-lg font-semibold text-slate-900">
                {exhibitor.company_name}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {exhibitor.country || "Country not available"}
              </p>

              <div className="mt-4 text-sm text-slate-500">
                {exhibitor.hall_no && (
                  <p>Hall: {exhibitor.hall_no}</p>
                )}

                {exhibitor.booth_no && (
                  <p>Booth: {exhibitor.booth_no}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}