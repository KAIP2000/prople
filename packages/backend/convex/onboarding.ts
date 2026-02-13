import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

type DraftPatch = {
  role?: "landlord" | "property_manager" | "accountant" | "admin";
  landlordProfile?: {
    name: string;
    countryRegion: string;
    managementMode: "self_manage" | "has_manager";
  };
  landlordProperty?: {
    propertyName: string;
    address: string;
    propertyType: string;
    units: number;
  };
  landlordExtra?: {
    leaseStorageIds: string[];
    tenants: Array<{ name: string; email?: string }>;
    connectBank: boolean;
  };
  managerBusiness?: {
    companyName: string;
    propertiesManaged: string;
    teamSize: "solo" | "small_team" | "enterprise";
  };
  managerStartMode?: "add_property" | "get_invited" | "import_properties";
  managerPermissions?: {
    rentCollection: boolean;
    maintenance: boolean;
    reporting: boolean;
  };
  managerTeamInvites?: Array<{ email: string; role: "admin" | "staff" }>;
  accountantProfile?: {
    name: string;
    firmName: string;
    regionCoverage: string;
    certifications?: string;
  };
  accountantControls?: { focusAreas: string[] };
};

async function getCurrentUserId(ctx: { auth: { getUserIdentity: () => Promise<{ subject: string } | null> } }) {
  return (await ctx.auth.getUserIdentity())?.subject ?? null;
}

async function getCurrentUserIdOrThrow(ctx: { auth: { getUserIdentity: () => Promise<{ subject: string } | null> } }) {
  const userId = await getCurrentUserId(ctx);
  if (!userId) throw new Error("Please sign in to continue.");
  return userId;
}

async function patchDraft(ctx: any, sessionId: string, patch: DraftPatch) {
  const now = Date.now();
  const existing = await ctx.db
    .query("onboardingDrafts")
    .withIndex("by_sessionId", (q: any) => q.eq("sessionId", sessionId))
    .first();

  if (existing) {
    await ctx.db.patch(existing._id, { ...patch, updatedAt: now });
    return existing._id;
  }

  return await ctx.db.insert("onboardingDrafts", {
    sessionId,
    status: "draft",
    finalizationAttempts: 0,
    ...patch,
    createdAt: now,
    updatedAt: now,
  });
}

export const getDraftBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    return await ctx.db
      .query("onboardingDrafts")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
      .first();
  },
});

export const saveRole = mutation({
  args: { sessionId: v.string(), role: v.union(v.literal("landlord"), v.literal("property_manager"), v.literal("accountant")) },
  handler: async (ctx, { sessionId, role }) => {
    await patchDraft(ctx, sessionId, { role });
  },
});

export const saveLandlordProfile = mutation({
  args: {
    sessionId: v.string(),
    name: v.string(),
    countryRegion: v.string(),
    managementMode: v.union(v.literal("self_manage"), v.literal("has_manager")),
  },
  handler: async (ctx, { sessionId, ...landlordProfile }) => {
    await patchDraft(ctx, sessionId, { landlordProfile });
  },
});

export const saveLandlordProperty = mutation({
  args: { sessionId: v.string(), propertyName: v.string(), address: v.string(), propertyType: v.string(), units: v.number() },
  handler: async (ctx, { sessionId, ...landlordProperty }) => {
    await patchDraft(ctx, sessionId, { landlordProperty });
  },
});

export const saveLandlordExtra = mutation({
  args: {
    sessionId: v.string(),
    tenants: v.array(v.object({ name: v.string(), email: v.optional(v.string()) })),
    connectBank: v.boolean(),
  },
  handler: async (ctx, { sessionId, tenants, connectBank }) => {
    const current = await ctx.db
      .query("onboardingDrafts")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
      .first();
    await patchDraft(ctx, sessionId, {
      landlordExtra: { leaseStorageIds: current?.landlordExtra?.leaseStorageIds ?? [], tenants, connectBank },
    });
  },
});

export const generateLeaseUploadUrl = mutation({
  args: {},
  handler: async (ctx) => await ctx.storage.generateUploadUrl(),
});

export const addLeaseUpload = mutation({
  args: { sessionId: v.string(), storageId: v.string() },
  handler: async (ctx, { sessionId, storageId }) => {
    const current = await ctx.db
      .query("onboardingDrafts")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId))
      .first();
    await patchDraft(ctx, sessionId, {
      landlordExtra: {
        leaseStorageIds: Array.from(new Set([...(current?.landlordExtra?.leaseStorageIds ?? []), storageId])),
        tenants: current?.landlordExtra?.tenants ?? [],
        connectBank: current?.landlordExtra?.connectBank ?? false,
      },
    });
  },
});

export const saveManagerBusiness = mutation({
  args: {
    sessionId: v.string(),
    companyName: v.string(),
    propertiesManaged: v.string(),
    teamSize: v.union(v.literal("solo"), v.literal("small_team"), v.literal("enterprise")),
  },
  handler: async (ctx, { sessionId, ...managerBusiness }) => {
    await patchDraft(ctx, sessionId, { managerBusiness });
  },
});

export const saveManagerStartMode = mutation({
  args: { sessionId: v.string(), managerStartMode: v.union(v.literal("add_property"), v.literal("get_invited"), v.literal("import_properties")) },
  handler: async (ctx, { sessionId, managerStartMode }) => {
    await patchDraft(ctx, sessionId, { managerStartMode });
  },
});

export const saveManagerPermissions = mutation({
  args: { sessionId: v.string(), rentCollection: v.boolean(), maintenance: v.boolean(), reporting: v.boolean() },
  handler: async (ctx, { sessionId, ...managerPermissions }) => {
    await patchDraft(ctx, sessionId, { managerPermissions });
  },
});

export const saveManagerTeamInvites = mutation({
  args: { sessionId: v.string(), invites: v.array(v.object({ email: v.string(), role: v.union(v.literal("admin"), v.literal("staff")) })) },
  handler: async (ctx, { sessionId, invites }) => {
    await patchDraft(ctx, sessionId, { managerTeamInvites: invites });
  },
});

export const saveAccountantProfile = mutation({
  args: {
    sessionId: v.string(),
    name: v.string(),
    firmName: v.string(),
    regionCoverage: v.string(),
    certifications: v.optional(v.string()),
  },
  handler: async (ctx, { sessionId, ...accountantProfile }) => {
    await patchDraft(ctx, sessionId, { accountantProfile });
  },
});

export const saveAccountantControls = mutation({
  args: { sessionId: v.string(), focusAreas: v.array(v.string()) },
  handler: async (ctx, { sessionId, focusAreas }) => {
    await patchDraft(ctx, sessionId, { accountantControls: { focusAreas } });
  },
});

export const attachDraftToCurrentUser = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const userId = await getCurrentUserIdOrThrow(ctx);
    const draft = await ctx.db.query("onboardingDrafts").withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId)).first();
    if (!draft) return { ok: false };
    await ctx.db.patch(draft._id, { ownerUserId: userId, updatedAt: Date.now() });
    return { ok: true };
  },
});

export const finalizeOnboarding = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, { sessionId }) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) return { state: "pending" as const, reason: "auth_not_ready" };

    const draft = await ctx.db.query("onboardingDrafts").withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId)).first();
    if (!draft || !draft.role) return { state: "pending" as const, reason: "draft_missing" };

    const now = Date.now();
    await ctx.db.patch(draft._id, {
      ownerUserId: userId,
      status: "pending_finalization",
      finalizationAttempts: (draft.finalizationAttempts ?? 0) + 1,
      lastFinalizationError: undefined,
      updatedAt: now,
    });

    try {
      const existingProfile = await ctx.db.query("userProfiles").withIndex("by_userId", (q) => q.eq("userId", userId)).first();
      if (draft.finalizedAt && existingProfile) {
        return { state: "finalized" as const, role: existingProfile.role, isFirstOnboarding: false };
      }

      const profilePatch =
        draft.role === "landlord"
          ? { role: draft.role, name: draft.landlordProfile?.name, countryRegion: draft.landlordProfile?.countryRegion, managementMode: draft.landlordProfile?.managementMode }
          : draft.role === "property_manager"
            ? {
                role: draft.role,
                companyName: draft.managerBusiness?.companyName,
                propertiesManaged: draft.managerBusiness?.propertiesManaged,
                teamSize: draft.managerBusiness?.teamSize,
                managerStartMode: draft.managerStartMode,
                permissions: draft.managerPermissions,
              }
            : {
                role: draft.role,
                name: draft.accountantProfile?.name,
                firmName: draft.accountantProfile?.firmName,
                regionCoverage: draft.accountantProfile?.regionCoverage,
                certifications: draft.accountantProfile?.certifications,
                focusAreas: draft.accountantControls?.focusAreas ?? [],
              };

      const profileId =
        existingProfile?._id ??
        (await ctx.db.insert("userProfiles", {
          userId,
          role: draft.role,
          onboardingCompleted: true,
          onboardingCompletedAt: now,
        }));

      await ctx.db.patch(profileId, { ...profilePatch, onboardingCompleted: true, onboardingCompletedAt: now });

      if (draft.role === "landlord" && draft.landlordProperty) {
        const propertyId = await ctx.db.insert("properties", {
          profileUserId: userId,
          kind: "owned",
          name: draft.landlordProperty.propertyName,
          address: draft.landlordProperty.address,
          propertyType: draft.landlordProperty.propertyType,
          units: draft.landlordProperty.units,
          createdAt: now,
        });
        await ctx.db.patch(profileId, { defaultPropertyId: propertyId });

        for (const tenant of draft.landlordExtra?.tenants ?? []) {
          await ctx.db.insert("tenants", { profileUserId: userId, propertyId, name: tenant.name, email: tenant.email, createdAt: now });
        }
        for (const storageId of draft.landlordExtra?.leaseStorageIds ?? []) {
          await ctx.db.insert("leaseUploads", { profileUserId: userId, storageId, createdAt: now });
        }
      }

      if (draft.role === "property_manager") {
        if (draft.managerStartMode === "add_property") {
          await ctx.db.insert("properties", {
            profileUserId: userId,
            kind: "managed",
            name: "New managed property",
            address: "Add address",
            propertyType: "Multi-unit",
            units: 1,
            createdAt: now,
          });
        }
        for (const invite of draft.managerTeamInvites ?? []) {
          await ctx.db.insert("teamInvites", { profileUserId: userId, email: invite.email, role: invite.role, status: "pending", createdAt: now });
        }
      }

      await ctx.db.patch(draft._id, { status: "finalized", finalizedAt: now, updatedAt: now });
      return { state: "finalized" as const, role: draft.role, isFirstOnboarding: !existingProfile };
    } catch (error) {
      await ctx.db.patch(draft._id, {
        status: "failed",
        lastFinalizationError: error instanceof Error ? error.message : "Unknown finalization error",
        updatedAt: Date.now(),
      });
      return { state: "pending" as const, reason: "retry_required" };
    }
  },
});

export const getFinalizationState = query({
  args: { sessionId: v.optional(v.string()) },
  handler: async (ctx, { sessionId }) => {
    const userId = await getCurrentUserId(ctx);
    const profile = userId
      ? await ctx.db.query("userProfiles").withIndex("by_userId", (q) => q.eq("userId", userId)).first()
      : null;
    if (profile) return { state: "finalized" as const, role: profile.role };

    let draft = null;
    if (sessionId) {
      draft = await ctx.db.query("onboardingDrafts").withIndex("by_sessionId", (q) => q.eq("sessionId", sessionId)).first();
    }
    if (!draft && userId) {
      draft = await ctx.db.query("onboardingDrafts").withIndex("by_ownerUserId", (q) => q.eq("ownerUserId", userId)).first();
    }
    if (!draft) return { state: "pending" as const, reason: "draft_missing" };

    return {
      state: draft.status === "finalized" ? ("finalized" as const) : ("pending" as const),
      reason: draft.status === "failed" ? draft.lastFinalizationError ?? "retry_required" : draft.status ?? "pending_finalization",
      sessionId: draft.sessionId,
      role: draft.role,
    };
  },
});

export const getCurrentProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) return null;
    return await ctx.db.query("userProfiles").withIndex("by_userId", (q) => q.eq("userId", userId)).first();
  },
});

export const markWelcomeSeen = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getCurrentUserId(ctx);
    if (!userId) return;
    const profile = await ctx.db.query("userProfiles").withIndex("by_userId", (q) => q.eq("userId", userId)).first();
    if (!profile || profile.welcomeSeenAt) return;
    await ctx.db.patch(profile._id, { welcomeSeenAt: Date.now() });
  },
});
