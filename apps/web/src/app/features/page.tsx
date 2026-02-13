"use client"

import Header from "@/components/Header"
import { Footer } from "@/components/footer"
import { CTA } from "@/components/cta"
import {
  Building2,
  Users,
  TrendingUp,
  Wrench,
  FileText,
  BarChart3,
  Bell,
  Search,
  MapPin,
  CreditCard,
  ShieldCheck,
  Clock,
  Home,
  Key,
  Receipt,
  PieChart,
  FolderOpen,
  Mail,
} from "lucide-react"

const featureSections = [
  {
    id: "property",
    badge: "Property Management",
    title: "All your properties, organised",
    description:
      "Add, edit, and group properties into portfolios. Track property values, ownership percentages, upload photos, and assign managers. Whether it is a studio flat in Leeds or a commercial block in London, everything lives in one place.",
    features: [
      { icon: Building2, label: "Add residential, commercial, and mixed-use properties" },
      { icon: MapPin, label: "Address lookup with map integration" },
      { icon: Home, label: "Manage individual units within properties" },
      { icon: Key, label: "Track occupancy status per unit" },
      { icon: Users, label: "Assign property managers and owners" },
      { icon: BarChart3, label: "Group properties into portfolios" },
    ],
  },
  {
    id: "tenant",
    badge: "Tenant & Lease Management",
    title: "Tenants and leases, sorted",
    description:
      "Keep a clear record of every tenant, lease agreement, and deposit. Get automated reminders before leases expire and store all tenancy documents in one secure location. No more digging through email.",
    features: [
      { icon: Users, label: "Full tenant profiles with contact details" },
      { icon: FileText, label: "Lease tracking with start and end dates" },
      { icon: CreditCard, label: "Deposit and rent amount records" },
      { icon: Bell, label: "Automated lease expiration reminders" },
      { icon: Clock, label: "Lease status tracking (active, expired, terminated)" },
      { icon: FolderOpen, label: "Upload and store lease documents securely" },
    ],
  },
  {
    id: "finance",
    badge: "Financial Tracking",
    title: "Know exactly where you stand",
    description:
      "Track every pound in and out across your portfolio. Record rent payments, log expenses by category, monitor overdue rent, and generate clear financial reports. Export everything for your accountant in seconds.",
    features: [
      { icon: Receipt, label: "Track rent invoices and payment status" },
      { icon: TrendingUp, label: "Monitor income vs expenses per property" },
      { icon: PieChart, label: "ROI, cap rate, and net operating income" },
      { icon: CreditCard, label: "Manual and online payment recording" },
      { icon: BarChart3, label: "Custom reports (monthly, quarterly, annual)" },
      { icon: Mail, label: "Export data as CSV, PDF, or Excel" },
    ],
  },
  {
    id: "maintenance",
    badge: "Maintenance & Requests",
    title: "Stay on top of every repair",
    description:
      "Create, assign, and track maintenance requests from start to finish. Set priorities, assign vendors, and keep a full history of every job. Tenants can even submit requests directly if you enable it.",
    features: [
      { icon: Wrench, label: "Create and manage maintenance requests" },
      { icon: ShieldCheck, label: "Set priority levels (low, medium, high, emergency)" },
      { icon: Users, label: "Assign to vendors or internal staff" },
      { icon: Clock, label: "Track status (open, in progress, completed)" },
      { icon: Search, label: "Full maintenance history per property and unit" },
      { icon: Bell, label: "Notifications for status updates" },
    ],
  },
  {
    id: "documents",
    badge: "Document Management",
    title: "Every document, one search away",
    description:
      "Store leases, invoices, insurance certificates, and legal documents in a centralised, searchable library. Tag documents, control who can see them, and never lose a file again.",
    features: [
      { icon: FolderOpen, label: "Centralised document storage" },
      { icon: Search, label: "Search and tag documents" },
      { icon: FileText, label: "Categories: leases, invoices, insurance, legal" },
      { icon: ShieldCheck, label: "Role-based access control" },
      { icon: Clock, label: "Version history and audit trail" },
      { icon: BarChart3, label: "Bulk upload and organise" },
    ],
  },
  {
    id: "analytics",
    badge: "Analytics & Reporting",
    title: "Decisions backed by real data",
    description:
      "Access portfolio-level dashboards with total value, monthly cash flow, and vacancy rates. Generate custom reports for any time period and export them for meetings, lenders, or tax returns.",
    features: [
      { icon: PieChart, label: "Portfolio-level dashboard overview" },
      { icon: TrendingUp, label: "Monthly cash flow and NOI tracking" },
      { icon: BarChart3, label: "Income vs expense visualisations" },
      { icon: Search, label: "Vacancy rate tracking per property" },
      { icon: FileText, label: "Custom report builder" },
      { icon: Mail, label: "Export reports in PDF and Excel" },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-16 lg:pt-36 lg:pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-4 py-1.5 mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Platform Features</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight text-balance mb-6">
            Everything you need to{" "}
            <span className="text-amber-700">manage property</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            A complete set of tools for UK landlords, investors, and property managers. No unnecessary complexity, just what
            works.
          </p>
        </div>
      </section>

      {featureSections.map((section, sectionIndex) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-20 lg:py-24 ${sectionIndex % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className={sectionIndex % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 border border-amber-200 px-3 py-1 mb-6">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{section.badge}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4 text-balance">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{section.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.features.map((feature) => (
                    <div key={feature.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <feature.icon className="w-4 h-4 text-amber-700" />
                      </div>
                      <span className="text-sm text-foreground leading-relaxed">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={sectionIndex % 2 === 1 ? "lg:order-1" : ""}>
                <div className="card-interactive rounded-2xl border border-border bg-card p-6 shadow-lg">
                  <div className="rounded-xl bg-muted p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        {(() => {
                          const IconComp = section.features[0].icon
                          return <IconComp className="w-5 h-5 text-amber-700" />
                        })()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{section.badge}</p>
                        <p className="text-xs text-muted-foreground">PropFolio Dashboard</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      {section.features.slice(0, 4).map((feature, fi) => (
                        <div key={feature.label} className="flex items-center gap-3 rounded-lg bg-card p-3 border border-border">
                          <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <feature.icon className="w-3.5 h-3.5 text-amber-700" />
                          </div>
                          <span className="text-xs text-foreground flex-1 truncate">{feature.label}</span>
                          <div className="w-12 h-2 rounded-full bg-amber-100">
                            <div className="h-full rounded-full bg-amber-500" style={{ width: `${70 + fi * 8}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CTA />
      <Footer />
    </main>
  )
}
