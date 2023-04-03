import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { uploadFile, getFileURL } from '~/server/api/s3';
import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import filterUserForPost from '~/server/helpers/filterUserForPost';

export const repliesRouter = createTRPCRouter({

    getAllByPostId: publicProcedure
    .input(z.string().min(1)).query(async ({ ctx, input }) => {
        const replies = await ctx.prisma.reply.findMany({
            where: {
                postId: input
            },
            include: {
                likes: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const users = ( await clerkClient.users.getUserList({
            userId: replies.map((reply) => reply.userId),
            limit: 15,
        }) ).map(filterUserForPost)

        const repliesWithMediaLinks = await Promise.all(replies.map(async (reply) => {
            if (reply.media === null) return reply
            
            const replyImgLink = await getFileURL(reply.media)
            reply.link = replyImgLink
            return reply
        }))

        return repliesWithMediaLinks.map((reply) => {
            const user = users.find((user) => user.id === reply.userId)

            if (!user) throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'User for reply not found'
            })

            return {
                reply,
                user
            }
        })
    }),


    createOne: protectedProcedure
    .input(z.object({
        body: z.string().min(1).max(500),
        media: z.object({
            buffer: z.string(),
            mimetype: z.string()
        }).nullable(),
        postId: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }) => {
        const fileName = input.media ? await uploadFile(input.media) : null

        if (!ctx.userId) throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You are not logged in.'
        })

        return ctx.prisma.reply.create({
            data: {
                userId: ctx.userId,
                body: input.body,
                postId: input.postId,
                media: fileName,
            }
        })
    })
});