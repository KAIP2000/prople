import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Cron-friendly mutation: generate income transactions on the 1st for all properties marked as occupied.
export const runMonthlyRent = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const properties = await ctx.db.query("properties").collect();
    let created = 0;

    for (const property of properties) {
      // Simple placeholder: $1,600 per unit. In production, pull lease/rent roll amounts.
      const amount = (property.units ?? 1) * 1600;
      await ctx.db.insert("transactions", {
        userId: property.profileUserId,
        propertyId: property._id,
        type: "income",
        category: "Rent",
        amount,
        occurredAt: now,
        note: "Automated monthly rent",
        source: "cron",
      });
      created += 1;
    }
    return { created };
  },
});

// Portfolio analytics: NOI and Cap Rate from existing transactions.
export const calculatePortfolioMetrics = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, { userId }) => {
    const identity = userId ?? (await ctx.auth.getUserIdentity())?.subject;
    if (!identity) throw new Error("Unauthorized");

    const transactions = await ctx.db.query("transactions").withIndex("by_userId", (q: any) => q.eq("userId", identity)).collect();
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    const noi = income - expenses;
    const portfolioValue =
      (await ctx.db.query("portfolios").withIndex("by_ownerUserId", (q: any) => q.eq("ownerUserId", identity)).first())?.value ?? 0;
    const capRate = portfolioValue > 0 ? noi / portfolioValue : 0;

    return {
      income,
      expenses,
      noi,
      capRate,
    };
  },
});
