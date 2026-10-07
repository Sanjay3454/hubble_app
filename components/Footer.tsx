import Link from "next/link";

type Props = {
  exhibitorCount: number;
};

export default function Footer({ exhibitorCount }: Props) {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold">Hubble</h2>

            <p className="mt-4 max-w-sm leading-7 text-slate-400">
              Cellular IoT connectivity designed for modern connected products.
            </p>
          </div>

          <div>
            <p className="font-semibold">Explore</p>

            <div className="mt-4 flex flex-col gap-3 text-slate-400">
              <Link href="/#products">Products</Link>
              <Link href="/#features">Features</Link>
              <Link href="/#consult">Consult</Link>
            </div>
          </div>

          <div>
            <p className="font-semibold">Live Exhibitor Data</p>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              {exhibitorCount} exhibitors currently loaded from the database.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:mt-14 sm:pt-8">
          © 2026 Hubble. Built for Cavli Wireless Web Developer Task.
        </div>
      </div>
    </footer>
  );
}