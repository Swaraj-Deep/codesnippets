import { mutation } from './_generated/server';
import { query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { ERROR_CODES } from '../src/constants/errorCodes';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('users').collect();
  },
});

export const createUser = mutation({
  args: {
    data: v.object({
      firstName: v.string(),
      lastName: v.string(),
      email: v.string(),
      password: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { data } = args;
    const { email } = data;
    const normalizedEmail = email.toLowerCase();
    const [user] = await ctx.db
      .query('users')
      .filter((query) => query.eq(query.field('email'), normalizedEmail))
      .collect();
    if (user) {
      throw new ConvexError({ code: ERROR_CODES.ERR_001, severity: 'high' });
    }
    await ctx.db.insert('users', { ...data, email: normalizedEmail });
  },
});

export const getUser = mutation({
  args: {
    data: v.object({
      email: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { data } = args;
    const { email } = data;
    const normalizedEmail = email.toLowerCase();
    const [user] = await ctx.db
      .query('users')
      .filter((query) => query.eq(query.field('email'), normalizedEmail))
      .collect();
    if (!user) {
      throw new ConvexError({ code: ERROR_CODES.ERR_004, severity: 'high' });
    }
    return user;
  },
});
