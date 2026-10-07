import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.25),_transparent_35%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:min-h-[620px] lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <span className="mb-5 inline-block rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
            Cellular IoT Connectivity
          </span>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Powering the future of connected devices.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Explore reliable cellular IoT modules designed for scalable,
            secure and global connectivity.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#products"
              className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
            >
              Explore Products
            </Link>

            <Link
              href="#consult"
              className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-slate-950"
            >
              Consult Now
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative h-[300px] w-full max-w-[520px] rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-5 shadow-2xl sm:h-[360px] sm:p-8">
            <div className="absolute left-5 top-5 text-sm text-slate-400 sm:left-8 sm:top-8">
              Hubble IoT Module
            </div>

            <div className="flex h-full items-center justify-center">
              <div className="flex h-48 w-full max-w-72 items-center justify-center rounded-2xl border border-blue-500/30 bg-slate-950 shadow-[0_0_80px_rgba(59,130,246,0.25)] sm:h-52">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">Hubble</div>
                  <div className="mt-2 text-sm text-slate-400">
                    Cellular IoT Module
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-5 right-5 rounded-full border border-slate-600 px-3 py-2 text-xs text-slate-300 sm:bottom-8 sm:right-8 sm:px-4">
              5G • LTE • IoT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;