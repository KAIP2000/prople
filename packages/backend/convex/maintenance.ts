import { mutation } from "./_generated/server";
import { v } from "convex/values";

async function requireUser(ctx: any) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  return identity.subject;
}

async function canAccessProperty(ctx: any, userId: string, propertyId: any) {
  const property = await ctx.db.get(propertyId);
  if (!property) return false;
  if (property.profileUserId === userId) return true; // owner
  const assignment = await ctx.db
    .query("propertyAssignments")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .filter((q: any) => q.eq(q.field("propertyId"), propertyId))
    .first();
  return Boolean(assignment);
}

export const updateMaintenanceStatus = mutation({
  args: {
    requestId: v.id("maintenanceRequests"),
    status: v.union(v.literal("open"), v.literal("in_progress"), v.literal("completed")),
  },
  handler: async (ctx, { requestId, status }) => {
    const userId = await requireUser(ctx);
    const request = await ctx.db.get(requestId);
    if (!request) throw new Error("Request not found");
    const allowed = await canAccessProperty(ctx, userId, request.propertyId);
    if (!allowed) throw new Error("Forbidden");

    await ctx.db.patch(requestId, { status, updatedAt: Date.now() });

    if (status === "completed") {
      await ctx.db.insert("auditLogs", {
        userId,
        action: "maintenance_completed",
        entityType: "maintenance",
        entityId: requestId,
        createdAt: Date.now(),
      });
    }

    return { ok: true };
  },
});
