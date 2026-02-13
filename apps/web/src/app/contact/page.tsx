"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react"

const contactDetails = [
  {
    icon: Mail,
    title: "Email us",
    detail: "hello@propfolio.co.uk",
    description: "We aim to respond within 24 hours.",
  },
  {
    icon: Phone,
    title: "Call us",
    detail: "0161 123 4567",
    description: "Monday to Friday, 9am to 5:30pm.",
  },
  {
    icon: MapPin,
    title: "Visit us",
    detail: "Manchester, M1 2AB",
    description: "By appointment only.",
  },
  {
    icon: Clock,
    title: "Support hours",
    detail: "Mon-Fri, 9am-5:30pm",
    description: "Emergency support available 24/7.",
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-4 py-1.5 mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance mb-6">
            We would love to{" "}
            <span className="text-amber-700">hear from you</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Whether you have a question about our platform, need help getting started, or want to discuss your requirements, our team is here to help.
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {contactDetails.map((item) => (
                <div key={item.title} className="card-interactive flex items-start gap-4 p-5 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                    <p className="text-foreground font-medium text-sm">{item.detail}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-xl bg-primary text-primary-foreground mt-2">
                <h3 className="font-semibold text-sm mb-2">Looking for a demo?</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed mb-4">
                  Book a free 30-minute walkthrough of PropFolio with one of our team. We will show you how the platform works and answer any questions.
                </p>
                <Link href="/pricing">
                  <Button size="lg" className="btn-interactive w-full bg-black hover:bg-black/90 text-white font-semibold h-12 rounded-xl text-sm">
                    View Plans & Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 lg:p-10">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-amber-700" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Thank you for your message</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                      We have received your enquiry and will get back to you within 24 hours. In the meantime, feel free to explore our features.
                    </p>
                    <Link href="/features">
                      <Button className="btn-interactive bg-black hover:bg-black/90 text-white font-semibold px-8 h-12 rounded-xl">
                        Explore Features
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Send us a message</h2>
                    <p className="text-sm text-muted-foreground mb-8">Fill in the form below and we will be in touch shortly.</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First name</Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            required
                            className="h-12 rounded-xl bg-background border-border"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last name</Label>
                          <Input
                            id="lastName"
                            placeholder="Smith"
                            required
                            className="h-12 rounded-xl bg-background border-border"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.co.uk"
                          required
                          className="h-12 rounded-xl bg-background border-border"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone number (optional)</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="07123 456789"
                          className="h-12 rounded-xl bg-background border-border"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="properties" className="text-sm font-medium text-foreground">How many properties do you manage?</Label>
                        <Input
                          id="properties"
                          placeholder="e.g. 5, 20, 100+"
                          className="h-12 rounded-xl bg-background border-border"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="message" className="text-sm font-medium text-foreground">Your message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us what you need help with..."
                          required
                          rows={5}
                          className="rounded-xl bg-background border-border resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="btn-interactive w-full bg-black hover:bg-black/90 text-white font-semibold h-14 text-base rounded-xl"
                      >
                        Send Message
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        By submitting this form, you agree to our Privacy Policy. We will never share your data with third parties.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
