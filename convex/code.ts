import { ERROR_CODES } from '../src/constants/errorCodes';
import { mutation, query } from './_generated/server';
import { ConvexError, v } from 'convex/values';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('code').collect();
  },
});

export const createCode = mutation({
  args: {
    data: v.object({
      code: v.string(),
      snippetId: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { data } = args;
    const { snippetId, code } = data;
    const [savedCode] = await ctx.db
      .query('code')
      .filter((query) => query.eq(query.field('snippetId'), snippetId))
      .collect();
    try {
      if (!savedCode) {
        await ctx.db.insert('code', { ...data, version: 0, isShared: false });
      } else {
        const { version } = savedCode;
        await ctx.db.patch(savedCode._id, {
          code,
          version: Number(version) + 1,
        });
      }
    } catch (err) {
      throw new ConvexError({ code: ERROR_CODES.ERR_007, severity: 'high' });
    }
  },
});
