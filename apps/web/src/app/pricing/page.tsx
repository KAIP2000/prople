"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Starter",
    description: "For individual landlords getting started.",
    monthlyPrice: 9,
    yearlyPrice: 7,
    features: [
      "Up to 5 properties",
      "Tenant and lease management",
      "Rent tracking and reminders",
      "Document storage (1 GB)",
      "Basic financial reports",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For growing portfolios and serious landlords.",
    monthlyPrice: 29,
    yearlyPrice: 24,
    features: [
      "Up to 50 properties",
      "Everything in Starter",
      "Maintenance request tracking",
      "Document storage (10 GB)",
      "Advanced analytics and reports",
      "Role-based team access",
      "Export to PDF and Excel",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For property managers and large portfolios.",
    monthlyPrice: 79,
    yearlyPrice: 66,
    features: [
      "Unlimited properties",
      "Everything in Professional",
      "Custom report builder",
      "Unlimited document storage",
      "Accountant read-only access",
      "API access",
      "Dedicated account manager",
      "Phone and email support",
      "Custom onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

const comparisonFeatures = [
  { name: "Properties", starter: "Up to 5", professional: "Up to 50", enterprise: "Unlimited" },
  { name: "Tenant management", starter: true, professional: true, enterprise: true },
  { name: "Lease tracking", starter: true, professional: true, enterprise: true },
  { name: "Rent reminders", starter: true, professional: true, enterprise: true },
  { name: "Maintenance requests", starter: false, professional: true, enterprise: true },
  { name: "Financial reports", starter: "Basic", professional: "Advanced", enterprise: "Custom" },
  { name: "Document storage", starter: "1 GB", professional: "10 GB", enterprise: "Unlimited" },
  { name: "Team access", starter: false, professional: true, enterprise: true },
  { name: "Accountant access", starter: false, professional: false, enterprise: true },
  { name: "Export (PDF/Excel)", starter: false, professional: true, enterprise: true },
  { name: "API access", starter: false, professional: false, enterprise: true },
  { name: "Support", starter: "Email", professional: "Priority email", enterprise: "Phone & email" },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-4 py-1.5 mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Simple Pricing</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance mb-6">
            Plans that grow{" "}
            <span className="text-amber-700">with you</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            Start free for 14 days. No credit card required. Cancel anytime.
          </p>

          <div className="inline-flex items-center bg-muted rounded-full p-1 mb-12">
            <button
              onClick={() => setYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !yearly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                yearly ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-1.5 text-xs font-bold text-amber-700">Save 17%</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card-interactive relative rounded-2xl border p-8 flex flex-col ${
                  plan.highlighted
                    ? "border-accent bg-card shadow-xl scale-[1.02]"
                    : "border-border bg-card"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-serif font-bold text-foreground">
                      {"\u00A3"}{yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  {yearly && (
                    <p className="text-xs text-amber-700 mt-1">
                      Billed annually ({"\u00A3"}{plan.yearlyPrice * 12}/year)
                    </p>
                  )}
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-amber-800">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="btn-interactive w-full h-13 text-sm font-semibold rounded-xl bg-black hover:bg-black/90 text-white"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-12">
            Compare plans
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 pr-4 text-sm font-medium text-muted-foreground w-1/4">Feature</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-foreground w-1/4">Starter</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-accent w-1/4">Professional</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-foreground w-1/4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.name} className="border-b border-border/50">
                    <td className="py-4 pr-4 text-sm text-foreground">{feature.name}</td>
                    {(["starter", "professional", "enterprise"] as const).map((plan) => (
                      <td key={plan} className="text-center py-4 px-4 align-middle">
                        {typeof feature[plan] === "boolean" ? (
                          feature[plan] ? (
                            <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-amber-200 text-amber-800">
                              <Check className="h-4 w-4" />
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40 text-sm">&mdash;</span>
                          )
                        ) : (
                          <span className="text-sm text-foreground">{feature[plan]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-balance">
            Not sure which plan is right for you?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Get in touch and we will help you find the perfect fit for your portfolio.
          </p>
          <Link href="/contact">
            <Button size="lg" className="btn-interactive bg-black hover:bg-black/90 text-white font-semibold px-10 h-14 text-base rounded-xl">
              Talk to Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
