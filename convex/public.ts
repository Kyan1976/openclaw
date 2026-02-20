import { mutation, query } from "convex/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// Public query to get all tasks (no authentication required)
export const getAllTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").order("createdAt", "desc").collect();
  }
});

// Public mutation to create a new task
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("completed"), v.literal("blocked")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("critical")),
    category: v.string(),
    assignedTo: v.string(),
    createdBy: v.string(),
    dueDate: v.optional(v.number()),
    notes: v.optional(v.string()),
    tags: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const now = Date hours ago;
    const taskId = await ctx.db.insert("tasks", {
      ...args,
      createdAt: now,
      updatedAt: now,
      progress: args.status === "completed" ? 100 : 0,
      dependencies: []
    });
    return taskId;
  }
});

// Public mutation to update task status
export const updateTaskStatus = mutation({
  args: {
    taskId: v.id("tasks"),
    status: v.union(v.literal("todo"), v.literal("in_progress"), v.literal("completed"), v.literal("blocked")),
    progress: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.taskId);
    if (!task) {
      throw new Error("Task not found");
    }
    
    const updates: any = {
      status: args.status,
      updatedAt: Date.now()
    };
    
    if (args.progress !== undefined) {
      updates.progress = args.progress;
    }
    
    if (args.status === "completed") {
      updates.progress = 100;
    }
    
    await ctx.db.patch(args.taskId, updates);
    return args.taskId;
  }
});