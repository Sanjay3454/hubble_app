"use client";

import Link from "next/link";

type Props = {
  exhibitorCount: number;
};

export default function Navbar({ exhibitorCount }: Props) {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-xl font-bold text-slate-900 sm:text-2xl">
          Hubble
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="#products" className="text-sm font-medium text-slate-600">
            Products
          </Link>

          <Link href="#features" className="text-sm font-medium text-slate-600">
            Features
          </Link>

          <Link href="#consult" className="text-sm font-medium text-slate-600">
            Consult
          </Link>

          <span className="text-sm text-slate-500">
            {exhibitorCount} exhibitors
          </span>
        </nav>

        <Link
          href="#consult"
          className="shrink-0 whitespace-nowrap rounded-full bg-slate-950 px-3 py-2.5 text-xs font-semibold text-white sm:px-5 sm:text-sm"
        >
          Consult Now
        </Link>
      </div>
    </header>
  );
}