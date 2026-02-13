import { Lightbulb, Heart, Clock } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Simple by design",
    description:
      "No jargon, no clutter. PropFolio is built with plain English and clean interfaces so you can get things done quickly, even if you are not tech-savvy.",
  },
  {
    icon: Heart,
    title: "Built for UK landlords",
    description:
      "From HMRC compliance to deposit protection schemes, PropFolio understands the UK property market inside and out. We speak your language.",
  },
  {
    icon: Clock,
    title: "Save time, reduce stress",
    description:
      "Automate rent reminders, generate reports in seconds, and keep everything in one place. Spend less time on admin and more time growing your portfolio.",
  },
];

const WhyPropertyPortfolio = () => {
  return (
    <section className="bg-[#faf5ee] py-20 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-4">
            Why PropFolio?
          </p>
          <h2 className="font-display text-3xl font-bold text-[#2c1f18] sm:text-4xl md:text-5xl">
            Property management{" "}
            <span className="font-serif italic text-amber-700">made simple</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="card-interactive flex flex-col items-center text-center"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 shadow-sm">
                <reason.icon className="h-7 w-7 text-amber-700" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#2c1f18]">
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#5b3a28]">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPropertyPortfolio;
