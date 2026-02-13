import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import { Building2, Users, CreditCard, Wrench } from "lucide-react";

const solutions = [
  {
    id: "property-management",
    icon: Building2,
    title: "Property Management",
    description: "Track units, occupancy, valuation, and portfolio growth from one dashboard.",
  },
  {
    id: "tenant-management",
    icon: Users,
    title: "Tenant Management",
    description: "Manage lease lifecycles, renewals, tenant communications, and onboarding workflows.",
  },
  {
    id: "rent-collection",
    icon: CreditCard,
    title: "Rent Collection",
    description: "Automate reminders, collect online payments, and reduce delinquency with smart billing.",
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Maintenance",
    description: "Capture work orders, assign vendors, and track completion times with full visibility.",
  },
];

export default function SolutionsPage() {
  return (
    <MarketingPageShell
      badge="Solutions"
      title="Purpose-Built Tools for Every Part of Property Operations"
      description="From property data to tenant workflows and rent collection, Prople keeps owners, managers, accountants, and admins aligned."
    >
      <div className="container grid gap-8 md:grid-cols-2">
        {solutions.map((solution) => (
          <article
            key={solution.id}
            id={solution.id}
            className="card-interactive rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
              <solution.icon className="h-6 w-6 text-amber-700" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">{solution.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">{solution.description}</p>
          </article>
        ))}
      </div>
    </MarketingPageShell>
  );
}
