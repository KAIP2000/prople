import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Sign Up & Choose Your Role",
    description:
      "Create your account and tell us how you'll use Prople -- as a Landlord, Property Manager, or Accountant.",
  },
  {
    number: "02",
    title: "Set Up Your Portfolio",
    description:
      "Owners create portfolios and add properties. Managers add units and tenants. Accountants connect to organizations.",
  },
  {
    number: "03",
    title: "Get Real-Time Insights",
    description:
      "Your personalized dashboard lights up with live KPIs, financial charts, maintenance alerts, and more.",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
            Get started in minutes
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            From sign-up to your first dashboard insight -- the onboarding
            process is designed to get you productive fast.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="card-interactive relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-border md:block" />
              )}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <span className="text-xl font-bold">{step.number}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:mt-16">
          <Button size="lg" asChild className="btn-interactive gap-2 bg-black text-white hover:bg-black/90 font-semibold px-8 h-14 text-base rounded-xl">
            <Link href="/onboarding">
              Start Managing Your Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
