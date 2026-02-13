import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    userId: v.string(),
    title: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
  }),
  onboardingDrafts: defineTable({
    sessionId: v.string(),
    ownerUserId: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("pending_finalization"),
        v.literal("finalized"),
        v.literal("failed"),
      ),
    ),
    finalizationAttempts: v.optional(v.number()),
    lastFinalizationError: v.optional(v.string()),
    role: v.optional(v.union(v.literal("landlord"), v.literal("property_manager"), v.literal("accountant"), v.literal("admin"))),
    landlordProfile: v.optional(
      v.object({
        name: v.string(),
        countryRegion: v.string(),
        managementMode: v.union(v.literal("self_manage"), v.literal("has_manager")),
      }),
    ),
    landlordProperty: v.optional(
      v.object({
        propertyName: v.string(),
        address: v.string(),
        propertyType: v.string(),
        units: v.number(),
      }),
    ),
    landlordExtra: v.optional(
      v.object({
        leaseStorageIds: v.array(v.string()),
        tenants: v.array(
          v.object({
            name: v.string(),
            email: v.optional(v.string()),
          }),
        ),
        connectBank: v.boolean(),
      }),
    ),
    managerBusiness: v.optional(
      v.object({
        companyName: v.string(),
        propertiesManaged: v.string(),
        teamSize: v.union(v.literal("solo"), v.literal("small_team"), v.literal("enterprise")),
      }),
    ),
    managerStartMode: v.optional(
      v.union(v.literal("add_property"), v.literal("get_invited"), v.literal("import_properties")),
    ),
    managerPermissions: v.optional(
      v.object({
        rentCollection: v.boolean(),
        maintenance: v.boolean(),
        reporting: v.boolean(),
      }),
    ),
    managerTeamInvites: v.optional(
      v.array(
        v.object({
          email: v.string(),
          role: v.union(v.literal("admin"), v.literal("staff")),
        }),
      ),
    ),
    accountantProfile: v.optional(
      v.object({
        name: v.string(),
        firmName: v.string(),
        regionCoverage: v.string(),
        certifications: v.optional(v.string()),
      }),
    ),
    accountantControls: v.optional(
      v.object({
        focusAreas: v.array(v.string()),
      }),
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    finalizedAt: v.optional(v.number()),
  })
    .index("by_sessionId", ["sessionId"])
    .index("by_ownerUserId", ["ownerUserId"]),
  userProfiles: defineTable({
    userId: v.string(),
    role: v.union(v.literal("landlord"), v.literal("property_manager"), v.literal("accountant"), v.literal("admin")),
    onboardingCompleted: v.boolean(),
    onboardingCompletedAt: v.number(),
    welcomeSeenAt: v.optional(v.number()),
    defaultPropertyId: v.optional(v.id("properties")),
    name: v.optional(v.string()),
    countryRegion: v.optional(v.string()),
    managementMode: v.optional(v.union(v.literal("self_manage"), v.literal("has_manager"))),
    companyName: v.optional(v.string()),
    propertiesManaged: v.optional(v.string()),
    teamSize: v.optional(v.union(v.literal("solo"), v.literal("small_team"), v.literal("enterprise"))),
    managerStartMode: v.optional(
      v.union(v.literal("add_property"), v.literal("get_invited"), v.literal("import_properties")),
    ),
    permissions: v.optional(
      v.object({
        rentCollection: v.boolean(),
        maintenance: v.boolean(),
        reporting: v.boolean(),
      }),
    ),
    firmName: v.optional(v.string()),
    regionCoverage: v.optional(v.string()),
    certifications: v.optional(v.string()),
    focusAreas: v.optional(v.array(v.string())),
  }).index("by_userId", ["userId"]),
  properties: defineTable({
    profileUserId: v.string(),
    kind: v.union(v.literal("owned"), v.literal("managed")),
    name: v.string(),
    address: v.string(),
    propertyType: v.string(),
    units: v.number(),
    createdAt: v.number(),
  }).index("by_profileUserId", ["profileUserId"]),
  tenants: defineTable({
    profileUserId: v.string(),
    propertyId: v.optional(v.id("properties")),
    name: v.string(),
    email: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_profileUserId", ["profileUserId"]),
  leaseUploads: defineTable({
    profileUserId: v.string(),
    storageId: v.string(),
    createdAt: v.number(),
  }).index("by_profileUserId", ["profileUserId"]),
  teamInvites: defineTable({
    profileUserId: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("staff")),
    status: v.union(v.literal("pending"), v.literal("accepted")),
    createdAt: v.number(),
  }).index("by_profileUserId", ["profileUserId"]),
  users: defineTable({
    userId: v.string(),
    email: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    role: v.optional(v.union(v.literal("landlord"), v.literal("property_manager"), v.literal("accountant"), v.literal("admin"))),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
  portfolios: defineTable({
    ownerUserId: v.string(),
    name: v.string(),
    segment: v.union(v.literal("residential"), v.literal("commercial"), v.literal("mixed")),
    value: v.number(),
    occupancy: v.number(),
    createdAt: v.number(),
  }).index("by_ownerUserId", ["ownerUserId"]),
  transactions: defineTable({
    userId: v.string(),
    propertyId: v.optional(v.id("properties")),
    portfolioId: v.optional(v.id("portfolios")),
    type: v.union(v.literal("income"), v.literal("expense")),
    category: v.string(),
    amount: v.number(),
    occurredAt: v.number(),
    note: v.optional(v.string()),
    receiptStorageId: v.optional(v.string()),
    source: v.optional(v.string()),
  }).index("by_userId", ["userId"]),
  maintenanceRequests: defineTable({
    propertyId: v.id("properties"),
    profileUserId: v.string(),
    title: v.string(),
    status: v.union(v.literal("open"), v.literal("in_progress"), v.literal("completed")),
    priority: v.union(v.literal("emergency"), v.literal("high"), v.literal("medium"), v.literal("low")),
    updatedAt: v.number(),
  }).index("by_propertyId", ["propertyId"]),
  propertyAssignments: defineTable({
    propertyId: v.id("properties"),
    userId: v.string(),
    role: v.union(v.literal("property_manager"), v.literal("accountant")),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_propertyId", ["propertyId"]),
  auditLogs: defineTable({
    userId: v.string(),
    action: v.string(),
    entityType: v.string(),
    entityId: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
