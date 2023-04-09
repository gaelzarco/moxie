import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from '@trpc/server';

export const likesRouter = createTRPCRouter({
    
    handlePostLike: protectedProcedure
    .input(z.object({
        postId: z.string().min(1),
        postType: z.enum(['POST'])
    })).mutation(async ({ ctx, input }) => {

         if (!input.postId || input.postType !== 'POST') throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'A post ID is required and post type must be "POST"'
        })

        const post = await ctx.prisma.post.findUnique({
            where: {
                id: input.postId
            },
            include: {
                likes: true,
            }
        })

        if (!post) throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Post not found'
        })

        if (post.likes.find((like) => like.userId === ctx.userId)) {
            return await ctx.prisma.like.deleteMany({
                where: {
                    userId: ctx.userId,
                    postId: post.id
                }
            })
        } else {
            return await ctx.prisma.like.create({
                data: {
                    userId: ctx.userId,
                    postId: post.id,
                    postType: input.postType
                }
            })
        }
        
    }),

    handleReplyLike: protectedProcedure
    .input(z.object({
        replyId: z.string().min(1).nullable(),
        postType: z.enum(['REPLY'])
    })).mutation(async ({ ctx, input }) => {

        if (!input.replyId || input.postType !== 'REPLY') throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'A reply ID is required and post type must be "REPLY"'
        })

        const reply = await ctx.prisma.reply.findUnique({
            where: {
                id: input.replyId
            },
            include: {
                likes: true
            }
        })

        if (!reply) throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Reply not found'
        })

        if (reply.likes.find((like) => like.userId === ctx.userId)) {
            return await ctx.prisma.like.deleteMany({
                where: {
                    userId: ctx.userId,
                    replyId: reply.id
                }
            })
        } else {
            return await ctx.prisma.like.create({
                data: {
                    userId: ctx.userId,
                    replyId: reply.id,
                    postType: input.postType
                }
            })
        }

    }),

})
