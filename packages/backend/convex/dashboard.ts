import { query } from "./_generated/server";

async function requireProfile(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  const profile = await ctx.db.query("userProfiles").withIndex("by_userId", (q: any) => q.eq("userId", identity.subject)).first();
  if (!profile) throw new Error("Profile not found");
  return { userId: identity.subject, profile };
}

const samples = {
  landlord: {
    role: "landlord" as const,
    cards: [
      { label: "Portfolio Value", value: "$12.4M", delta: "+3.1% MoM" },
      { label: "Occupancy", value: "94%", delta: "+2 pts" },
      { label: "Net Cash Flow (Monthly)", value: "$182,400", delta: "+$14,200" },
      { label: "Total Equity", value: "$4.7M", delta: "+$210k" },
    ],
    incomeVsExpense: [
      { month: "Mar", income: 310, expense: 182 },
      { month: "Apr", income: 326, expense: 191 },
      { month: "May", income: 332, expense: 205 },
      { month: "Jun", income: 338, expense: 214 },
      { month: "Jul", income: 341, expense: 221 },
      { month: "Aug", income: 348, expense: 219 },
      { month: "Sep", income: 355, expense: 226 },
      { month: "Oct", income: 362, expense: 232 },
      { month: "Nov", income: 365, expense: 241 },
      { month: "Dec", income: 372, expense: 244 },
      { month: "Jan", income: 378, expense: 248 },
      { month: "Feb", income: 384, expense: 252 },
    ],
    noiTrend: [
      { month: "Mar", noi: 128 },
      { month: "Apr", noi: 135 },
      { month: "May", noi: 141 },
      { month: "Jun", noi: 144 },
      { month: "Jul", noi: 147 },
      { month: "Aug", noi: 153 },
      { month: "Sep", noi: 158 },
      { month: "Oct", noi: 162 },
      { month: "Nov", noi: 165 },
      { month: "Dec", noi: 168 },
      { month: "Jan", noi: 172 },
      { month: "Feb", noi: 176 },
    ],
    properties: [
      { name: "Willow Courts", roi: "12.4%", occupancy: "97%", value: "$4.2M", equity: "$1.8M" },
      { name: "Harbor Lofts", roi: "10.9%", occupancy: "92%", value: "$3.1M", equity: "$1.1M" },
      { name: "Maple Row", roi: "9.6%", occupancy: "95%", value: "$2.7M", equity: "$0.9M" },
      { name: "Cedar Commons", roi: "8.2%", occupancy: "90%", value: "$2.4M", equity: "$0.7M" },
    ],
    renewals: [
      { label: "Lease renewal • Harbor Lofts #1203", date: "Feb 18", status: "Due soon" },
      { label: "Tax installment • Maple Row", date: "Mar 01", status: "Scheduled" },
      { label: "Insurance renewal • Willow Courts", date: "Mar 12", status: "Quote requested" },
    ],
    expenses: [
      { label: "Boiler replacement • Willow Courts", amount: "$12,800", date: "Feb 02" },
      { label: "Roof patch • Cedar Commons", amount: "$4,400", date: "Jan 27" },
    ],
  },
  manager: {
    role: "property_manager" as const,
    summary: [
      { label: "Units occupied", value: "124 / 138", badge: "94% filled" },
      { label: "Vacancies", value: "9", badge: "6 new this week" },
      { label: "Expiring leases (30d)", value: "6", badge: "review" },
      { label: "Overdue rent", value: "$18,400", badge: "12 tenants" },
    ],
    rentProgress: [
      { label: "Collected", percent: 72, amount: "$132,900" },
      { label: "Pending", percent: 18, amount: "$33,200" },
      { label: "Delinquent", percent: 10, amount: "$18,400" },
    ],
    maintenance: [
      { title: "HVAC outage - Willow Courts #302", urgency: "Emergency", status: "In progress" },
      { title: "Elevator inspection - Harbor Lofts", urgency: "High", status: "Scheduled" },
      { title: "Unit turnover cleaning - Maple Row #7B", urgency: "Medium", status: "Waiting vendor" },
    ],
    rentRoll: [
      { tenant: "Diaz Family", unit: "1203", status: "Overdue", amount: "$2,150" },
      { tenant: "Kim LLC", unit: "4A", status: "Pending", amount: "$3,420" },
      { tenant: "Lopez", unit: "7B", status: "Paid", amount: "$2,050" },
    ],
    mapPins: [
      { name: "Willow Courts", status: "occupied", city: "Seattle" },
      { name: "Harbor Lofts", status: "vacant", city: "Portland" },
      { name: "Maple Row", status: "occupied", city: "Tacoma" },
    ],
  },
  accountant: {
    role: "accountant" as const,
    cards: [
      { label: "Total transactions (90d)", value: "684", helper: "Read-only" },
      { label: "Income", value: "$1.12M", helper: "Rent + fees" },
      { label: "Expenses", value: "$482k", helper: "CapEx included" },
      { label: "Last export", value: "Feb 1, 2026", helper: "CSV" },
    ],
    transactions: [
      { id: "txn1", property: "Willow Courts", type: "income", category: "Rent", amount: "$2,450", date: "Feb 01", receipt: true },
      { id: "txn2", property: "Harbor Lofts", type: "expense", category: "Repairs", amount: "$1,280", date: "Jan 29", receipt: true },
      { id: "txn3", property: "Maple Row", type: "expense", category: "Insurance", amount: "$960", date: "Jan 27", receipt: false },
      { id: "txn4", property: "Harbor Lofts", type: "income", category: "Parking", amount: "$310", date: "Jan 25", receipt: true },
    ],
    readOnly: true,
  },
};

export const getDashboard = query({
  args: {},
  handler: async (ctx) => {
    const { userId, profile } = await requireProfile(ctx);

    if (profile.role === "admin") {
      const users = await ctx.db.query("userProfiles").collect();
      const auditLogs = await ctx.db.query("auditLogs").withIndex("by_userId", (q: any) => q.eq("userId", userId)).collect();
      return {
        role: "admin" as const,
        users: users?.map((u) => ({ name: u.name ?? "User", role: u.role, status: "active" })) ?? [],
        auditLogs: auditLogs?.map((a) => ({ action: a.action, actor: profile.name ?? "Admin", timestamp: new Date(a.createdAt ?? Date.now()).toISOString() })) ?? [],
      };
    }

    if (profile.role === "landlord") {
      const properties = await ctx.db.query("properties").withIndex("by_profileUserId", (q: any) => q.eq("profileUserId", userId)).collect();
      const transactions = await ctx.db.query("transactions").withIndex("by_userId", (q: any) => q.eq("userId", userId)).collect();
      if (properties.length === 0 || transactions.length === 0) return samples.landlord;
      return { ...samples.landlord, role: "landlord" as const };
    }

    if (profile.role === "property_manager") {
      const assignments = await ctx.db.query("propertyAssignments").withIndex("by_userId", (q: any) => q.eq("userId", userId)).collect();
      const propertyIds = assignments.map((a) => a.propertyId);
      if (propertyIds.length === 0) return samples.manager;
      return { ...samples.manager, role: "property_manager" as const };
    }

    if (profile.role === "accountant") {
      const assignments = await ctx.db.query("propertyAssignments").withIndex("by_userId", (q: any) => q.eq("userId", userId)).collect();
      const propertyIds = assignments.map((a) => a.propertyId);
      const transactions = propertyIds.length
        ? await ctx.db
            .query("transactions")
            .withIndex("by_userId", (q: any) => q.eq("userId", userId))
            .collect()
        : [];
      if (transactions.length === 0) return samples.accountant;
      return { role: "accountant" as const, cards: samples.accountant.cards, transactions: samples.accountant.transactions, readOnly: true };
    }

    return samples.landlord;
  },
});
