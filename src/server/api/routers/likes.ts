import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
// import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
// import filterUserForPost from '~/server/helpers/filterUserForPost';

export const likesRouter = createTRPCRouter({
    createOne: protectedProcedure
    .input(z.object({
        postId: z.string().min(1).nullable(),
        replyId: z.string().min(1).nullable(),
        postType: z.enum(['POST', 'REPLY'])
    })).mutation(async ({ ctx, input }) => {

         if(!input.postId && !input.replyId) throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'An ID is required'
        })

        if (input.postId && input.replyId) throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Only one ID is allowed at a time'
        })

        if (input.postType === 'POST' && input.postId) {
            const post = await ctx.prisma.post.findUnique({
                where: {
                    id: input.postId
                }
            })

            if (!post) throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Post not found'
            })

            const like = await ctx.prisma.like.create({
                data: {
                    userId: ctx.userId,
                    postId: post.id,
                    postType: input.postType
                }
            })

            return like
        } else if (input.postType === 'REPLY' && input.replyId) {
            const reply = await ctx.prisma.reply.findUnique({
                where: {
                    id: input.replyId
                }
            })

            if (!reply) throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Reply not found'
            })

            const like = await ctx.prisma.like.create({
                data: {
                    userId: ctx.userId,
                    replyId: reply.id,
                    postType: input.postType
                }
            })

            return like
        } else {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Invalid post type'
            })
        }
    }),
})