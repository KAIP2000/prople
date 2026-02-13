"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is a property management portfolio?",
    answer: "A property management portfolio is a collection of properties that you own, invest in, or manage. PropFolio helps you organise all of these into one clear dashboard so you can track performance, manage tenants, and stay on top of maintenance across every property you are responsible for.",
  },
  {
    question: "How many properties can I manage with PropFolio?",
    answer: "There is no limit. Whether you have a single buy-to-let flat or hundreds of units across multiple locations, PropFolio scales with your portfolio. Our platform is designed to handle thousands of properties without slowing down.",
  },
  {
    question: "Is PropFolio suitable for residential and commercial properties?",
    answer: "Yes. PropFolio supports residential, commercial, and mixed-use properties. You can set different property types, track different financial metrics, and manage each one according to its specific needs.",
  },
  {
    question: "How does PropFolio help with UK tax compliance?",
    answer: "PropFolio tracks all your income and expenses automatically, categorised in a way that makes tax reporting straightforward. You can export detailed financial reports for your accountant, and our system is designed to align with HMRC's Making Tax Digital requirements.",
  },
  {
    question: "Can I give my accountant access without them seeing everything?",
    answer: "Absolutely. PropFolio includes role-based access control. You can invite your accountant with read-only access so they can view financial data and export reports, without being able to make any changes to your portfolio.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your data belongs to you. If you decide to cancel, you can export everything before your account is closed. We retain data for 30 days after cancellation in case you change your mind, then it is securely deleted from our UK data centres.",
  },
  {
    question: "Is there a mobile app?",
    answer: "PropFolio is a fully responsive web application that works beautifully on any device, including phones and tablets. A dedicated mobile app for iOS and Android is planned for a future release.",
  },
  {
    question: "How do maintenance requests work?",
    answer: "You can create maintenance requests for any property or unit, set a priority level, assign it to a vendor or staff member, and track it through to completion. Tenants can also submit requests directly if you choose to enable that feature. Every request is logged with a full history.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 lg:py-28" id="faqs">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4">Frequently asked questions</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground text-balance">
            Got questions?{" "}
            <span className="text-amber-700">We have answers</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about managing your property portfolio with PropFolio.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-amber-700 py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <p className="text-lg font-semibold text-foreground mb-4">Ready to get started?</p>
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
