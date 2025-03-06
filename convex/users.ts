import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx,args) => {
    const user = await ctx.db.query('users')
    .filter(q=>q.eq(q.field('email'),args.email))
    .collect();
    if(user?.length ==0){
        // If no user Add record
        const data = {
            name: args.name,
            email: args.email,
            picture: args.picture,
            credits: 500
          }
          const result = await ctx.db.insert('users',data);
          return data;
        }
        return user[0];
    }
  },
);
