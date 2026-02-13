import Link from "next/link"
import { Building2, Users, Home, TrendingUp, Wrench, FileText, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Building2,
    title: "Property Management",
    description: "Add and organise all your properties and units in one place. Track values, ownership, and group them into portfolios.",
    href: "/features",
  },
  {
    icon: Users,
    title: "Tenant & Lease Management",
    description: "Manage tenants, leases, deposits, and automated reminders. Keep everything organised from move-in to move-out.",
    href: "/features",
  },
  {
    icon: TrendingUp,
    title: "Financial Tracking",
    description: "Track rent payments, expenses, and cash flow. See your ROI, net operating income, and vacancy rates at a glance.",
    href: "/features",
  },
  {
    icon: Wrench,
    title: "Maintenance Requests",
    description: "Create, assign, and track maintenance jobs. Set priorities, assign vendors, and keep a full history per property.",
    href: "/features",
  },
  {
    icon: FileText,
    title: "Document Storage",
    description: "Store leases, invoices, insurance certificates, and legal documents. Search, tag, and control access by role.",
    href: "/features",
  },
  {
    icon: Home,
    title: "Portfolio Analytics",
    description: "Get a clear view of your entire portfolio with dashboards, custom reports, and exportable data in PDF or Excel.",
    href: "/features",
  },
]

export default function Benefits() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4">Everything you need</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground text-balance">
            One platform for your{" "}
            <span className="text-amber-700">entire portfolio</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Whether you manage one property or one hundred, PropFolio gives you the tools to stay on top of every detail.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="card-interactive group relative bg-card border border-border rounded-2xl p-8 hover:border-accent/40 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                <feature.icon className="w-7 h-7 text-amber-700" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{feature.description}</p>
              <span className="inline-flex items-center text-sm font-semibold text-amber-700 group-hover:gap-2 gap-1 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
