import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("todos").order("desc").collect();
  },
});

export const addTodo = mutation({
  args: { title: v.string() },
  handler: async ({ db }, { title }) => {
    await db.insert("todos", {
      title,
      completed: false,
      createdAt: Date.now(),
    });
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos"), completed: v.boolean() },
  handler: async ({ db }, { id, completed }) => {
    await db.patch(id, { completed });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  },
});
