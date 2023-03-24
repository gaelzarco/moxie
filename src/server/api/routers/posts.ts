import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany()
    }),

    getOne: protectedProcedure
    .input(z.object({
        postId: z.string(),
      }))
    .query(({ ctx, input }) => {
        return ctx.prisma.post.findUnique({
        where: {
            id: input.postId,
        },
        });
    }),

    createOne: protectedProcedure
    .input(z.object({
        userId: z.string(),
        media: z.string(),
        body: z.string(),
    }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.post.create({
            data: {
                userId: input.userId,
                media: input.media,
                body: input.body
            },
        })
    })
})