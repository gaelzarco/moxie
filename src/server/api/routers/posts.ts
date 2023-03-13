import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany()
    }),

    getOne: protectedProcedure
    .input(postSchema)
    .query(({ ctx, input }) => {
        return ctx.prisma.post.findUnique({
        where: {
            id: input.postId,
        },
        });
    }),

    createOne: protectedProcedure
    .input(z.object({
        media: z.string(),
        body: z.string(),
    }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.post.create({
            data: {
                userId: ctx.session.user.id,
                media: input.media,
                body: input.body
            },
        })
    })
})