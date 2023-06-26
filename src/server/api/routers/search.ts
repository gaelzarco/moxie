import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import filterUserForPost from '~/server/helpers/filterUserForPost';

export const searchRouter = createTRPCRouter({
    findUser: publicProcedure
    .input(z.object({
        query: z.string().min(1)
    })).mutation(async ({ ctx, input }) => {
        const users = await clerkClient.users.getUserList({
            query: input.query,
            limit: 15
        })

        return users
    }),

    findPost: publicProcedure
    .input(z.object({
        query: z.string().min(1)
    })).mutation(async ({ ctx, input }) => {
        const posts = await ctx.prisma.post.findMany({
            where: {
                body: {
                    contains: input.query
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                _count: {
                    select: {
                        likes: true,
                        replies: true
                    }
                }
            },
            take: 15
        })
    })
})