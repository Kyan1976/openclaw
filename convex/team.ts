import { mutationGeneric as mutation, queryGeneric as query } from "convex/server";
import { v } from "convex/values";

// Query to get all team members
export const getAllTeamMembers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("teamMembers").collect();
  }
});

// Mutation to create or update team member
export const upsertTeamMember = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    avatar: v.optional(v.string()),
    isActive: v.boolean()
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const existing = await ctx.db.query("teamMembers")
      .filter(q => q.eq(q.field("name"), args.name))
      .first();
    
    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        lastActive: now
      });
      return existing._id;
    } else {
      const memberId = await ctx.db.insert("teamMembers", {
        ...args,
        lastActive: now
      });
      return memberId;
    }
  }
});