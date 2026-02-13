import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Clerk webhook target: upsert the user into Convex
export const syncClerkUser = mutation({
  args: {
    userId: v.string(),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    role: v.optional(v.union(v.literal("landlord"), v.literal("property_manager"), v.literal("accountant"), v.literal("admin"))),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("users").withIndex("by_userId", (q: any) => q.eq("userId", args.userId)).first();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, createdAt: existing.createdAt });
      return { updated: true };
    }
    await ctx.db.insert("users", { ...args, createdAt: Date.now() });
    return { created: true };
  },
});
