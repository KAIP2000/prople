import Link from "next/link";

const stats = [
  { value: "12.4%", label: "Avg NOI lift", sub: "after 90 days" },
  { value: "48h", label: "Maintenance SLA", sub: "with live alerts" },
  { value: "3 roles", label: "Owner • Manager • Accountant", sub: "all in one" },
];

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#f9f2e9] via-[#f6efe6] to-[#f1e3d5]">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left column - text centered on small, left-aligned on lg */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
              <img src="/images/prople-icon.svg" alt="Prople icon" className="h-6 w-6" />
              Real-Time Portfolio Intelligence
            </span>
            <h1 className="max-w-2xl font-display text-[36px] font-bold leading-[1.08] tracking-[-0.02em] text-[#2c1f18] sm:text-[42px] md:text-[56px] lg:text-[72px]">
              Your Properties. One Platform.{" "}
              <span className="text-[--color-brand]">Total Control.</span>
            </h1>
            <p className="max-w-2xl text-[16px] leading-[1.6] text-[#4f3523] sm:text-[18px] md:text-[20px]">
              One simple platform to track your properties, tenants, finances, and maintenance. Built for UK landlords, investors, and property managers who want clarity and control.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/onboarding"
                className="btn-interactive rounded-xl bg-black px-6 py-3 text-[15px] font-semibold text-white shadow-md transition hover:bg-black/90 md:text-base"
              >
                Manage My Portfolio
              </Link>
              <Link
                href="/resources"
                className="btn-interactive rounded-xl border border-black/20 bg-transparent px-6 py-3 text-[15px] font-semibold text-black transition hover:border-black hover:bg-black hover:text-white md:text-base"
              >
                See Dashboards
              </Link>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#6b4a33]">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Real-time updates
              </div>
            </div>

            <div className="grid w-full max-w-2xl grid-cols-3 gap-2 border-t border-[#e7d8c9] pt-6 sm:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="card-interactive rounded-xl bg-white px-3 py-2 shadow-sm sm:rounded-2xl sm:px-4 sm:py-3">
                  <p className="font-display text-xl font-bold leading-none text-[#2c1f18] sm:text-2xl md:text-[32px]">{stat.value}</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#8b5e3c] sm:text-sm">{stat.label}</p>
                  <p className="text-[10px] text-[#7b614d] sm:text-xs">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - dashboard preview */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[26px] border border-[#e7d8c9] bg-white p-4 shadow-[0_18px_60px_rgba(73,48,32,0.15)]">
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f7ede0] to-transparent" />
              <div className="relative rounded-2xl bg-[#fefbf7] p-4">
                <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src="/images/prople-icon.svg" className="h-9 w-9 rounded-lg" alt="Prople icon" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#8b5e3c]">Owner view</p>
                      <p className="text-lg font-bold text-[#2c1f18]">All in one place</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#f1e3d5] px-3 py-1 text-xs font-semibold text-[#8b5e3c]">Live</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
                  alt="Portfolio dashboard preview"
                  className="mt-4 h-[300px] w-full rounded-xl object-cover"
                />
              </div>
              <div className="mt-4 grid gap-3 md:absolute md:-bottom-8 md:left-4 md:w-2/3">
                <div className="rounded-2xl border border-[#e7d8c9] bg-white p-4 shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8b5e3c]">This month</p>
                  <p className="font-display text-3xl font-bold text-[#2c1f18]">£421,800</p>
                  <p className="text-sm font-semibold text-amber-700">+9.2% vs last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
