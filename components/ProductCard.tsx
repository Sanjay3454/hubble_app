import Link from "next/link";

type ProductCardProps = {
  name: string;
  slug: string;
  category: string;
  description: string;
};

export default function ProductCard({
  name,
  slug,
  category,
  description,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group min-w-0 rounded-3xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-xl sm:p-6"
    >
      <div className="flex h-48 items-center justify-center rounded-2xl bg-slate-100 sm:h-56">
        <div className="flex h-32 w-full max-w-44 items-center justify-center rounded-xl bg-slate-900 transition group-hover:scale-105">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="mt-1 text-xs text-slate-400">Hubble Module</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-blue-600">{category}</p>

        <h3 className="mt-2 break-words text-xl font-bold text-slate-900 sm:text-2xl">
          {name}
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          {description}
        </p>

        <p className="mt-5 font-semibold text-slate-900">
          View product →
        </p>
      </div>
    </Link>
  );
}