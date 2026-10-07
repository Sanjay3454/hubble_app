import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ModelViewer from "@/components/ModelViewer";
type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar-like top bar */}
      <header className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold text-slate-900 sm:text-2xl"
          >
            Hubble
          </Link>

          <Link
            href="/#products"
            className="text-right text-xs font-semibold text-slate-600 hover:text-slate-950 sm:text-sm"
          >
            ← Back to products
          </Link>
        </div>
      </header>

      {/* Product Hero */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              {product.category}
            </p>

            <h1 className="mt-4 break-words text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              {product.name}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              {product.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">
                  Connectivity
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {product.connectivity}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">
                  Form Factor
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  {product.formFactor}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm text-slate-500">
                  Platform
                </p>

                <p className="mt-2 font-semibold text-slate-900">
                  Hubble
                </p>
              </div>
            </div>

            <Link
              href="/#consult"
              className="mt-8 w-fit rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Consult Now
            </Link>
          </div>

          {/* RIGHT — 3D VIEWER PLACEHOLDER */}
          <div className="flex min-w-0 items-center justify-center rounded-3xl bg-slate-950 p-4 sm:p-6">
            <ModelViewer />
          </div>
        </div>
      </section>

      {/* Use case */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-blue-600">
            USE CASES
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Built for connected applications.
          </h2>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            {product.useCase}
          </p>
        </div>
      </section>
    </main>
  );
}