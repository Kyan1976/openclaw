import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("blocked")
    ),
    priority: v.union(
      v.literal("low"),
      v.literal("medium"),
      v.literal("high"),
      v.literal("critical")
    ),
    category: v.string(),
    assignedTo: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    dueDate: v.optional(v.number()),
    progress: v.number(), // 0-100
    notes: v.optional(v.string()),
    dependencies: v.array(v.id("tasks")),
    tags: v.array(v.string())
  }),
  teamMembers: defineTable({
    name: v.string(),
    role: v.string(),
    avatar: v.optional(v.string()),
    isActive: v.boolean(),
    lastActive: v.number()
  })
});