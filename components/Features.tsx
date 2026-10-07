const features = [
  {
    title: "Global Connectivity",
    description:
      "Cellular IoT modules designed for reliable connectivity across multiple regions.",
  },
  {
    title: "Fast Integration",
    description:
      "Developer-friendly hardware and software support for faster product deployment.",
  },
  {
    title: "Scalable Architecture",
    description:
      "Built for connected products that need to scale from prototype to production.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-slate-950 py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Why Hubble
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Built for modern connected products.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            A flexible cellular IoT platform designed to simplify connectivity,
            integration and deployment.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-7"
            >
              <div className="mb-5 h-10 w-10 rounded-xl bg-blue-600/20" />

              <h3 className="text-xl font-semibold">{feature.title}</h3>

              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}