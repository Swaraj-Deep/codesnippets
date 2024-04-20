import { query } from './_generated/server';
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('snippets').collect();
  },
});

export const createSnippet = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert('snippets', { text: args.text });
    // do something with `taskId`
  },
});
