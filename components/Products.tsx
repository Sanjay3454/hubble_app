import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function Products() {
  return (
    <section id="products" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Products
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Connectivity built for modern IoT.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore cellular IoT modules designed for reliable connectivity,
            scalable deployments and modern connected products.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}