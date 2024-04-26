import { ERROR_CODES } from '../src/constants/errorCodes';
import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('code').collect();
  },
});

export const createSnippet = mutation({
  args: {
    data: v.object({
      userId: v.string(),
      snippetId: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { data } = args;
    const { snippetId } = data;
    const [savedSnippet] = await ctx.db
      .query('snippets')
      .filter((query) => query.eq(query.field('snippetId'), snippetId))
      .collect();
    try {
      if (!savedSnippet) {
        await ctx.db.insert('snippets', { ...data });
      }
    } catch (err) {
      throw new ConvexError({ code: ERROR_CODES.ERR_007, severity: 'high' });
    }
  },
});

export const fetchSnippet = mutation({
  args: {
    data: v.object({
      userId: v.string(),
      snippetId: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { data } = args;
    const { snippetId, userId } = data;
    const [savedSnippet] = await ctx.db
      .query('snippets')
      .filter((query) => query.eq(query.field('snippetId'), snippetId))
      .collect();
    try {
      const { userId: savedUserId } = savedSnippet || {};
      if (savedUserId === userId) {
        const [savedCode] = await ctx.db
          .query('code')
          .filter((query) => query.eq(query.field('snippetId'), snippetId))
          .collect();
        const { code: codeSnippet, version } = savedCode || {};
        return { codeSnippet, version };
      }
      return { codeSnippet: '', version: -1 };
    } catch (err) {
      throw new ConvexError({ code: ERROR_CODES.ERR_007, severity: 'high' });
    }
  },
});
