import Link from "next/link";

const items = ["No credit card required", "14-day free trial", "Cancel anytime"];

const FooterHero = () => {
  return (
    <section className="bg-[#f6efe6] py-24">
      <div className="container">
        <div className="blue-cta rounded-[2rem] px-6 py-14 text-white shadow-xl md:px-12 md:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">Ready to launch Prople?</h2>
            <p className="mx-auto mt-6 max-w-3xl text-2xl text-[#fbeee0] md:text-3xl">
              Owners, managers, and accountants land on the right dashboard the moment onboarding ends.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/onboarding"
                className="rounded-xl bg-white px-6 py-3 text-base font-bold text-[#2c1f18] shadow-md transition hover:bg-[#f6efe6] hover:shadow-lg"
              >
                Get Started &rarr;
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Schedule a Demo
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
              {items.map((item) => (
                <span key={item} className="text-base font-medium text-white/80 md:text-lg">
                  - {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterHero;
