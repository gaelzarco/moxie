import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { uploadFile, getFileURL } from '~/server/api/s3';
import { clerkClient } from '@clerk/nextjs/server';
import { type User } from '@clerk/nextjs/dist/api';
import { TRPCError } from '@trpc/server';

const filterUserForPosts = (user: User) => {
    return {
        id: user.id,
        userName: user.username,
        profileImageURL: user.profileImageUrl,
    }
}

export const postsRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 10,
        })

        const users = ( await clerkClient.users.getUserList({
            userId: posts.map((post) => post.userId),
            limit: 10,
        }) ).map(filterUserForPosts)

        const postsWithMediaLinks = await Promise.all(posts.map(async (post) => {
            if (post.media === null) return post

            const postImgLink = await getFileURL(post.media)
            post.link = postImgLink
            return post
        }))

        return postsWithMediaLinks.map((post) => {
            const user = users.find((user) => user.id === post.userId)

            if (!user) throw new TRPCError({ 
                code: 'INTERNAL_SERVER_ERROR', 
                message: 'User for post not found'
            })

            return {
                post,
                user
            }
        })
    }),

    createOne: protectedProcedure
    .input(z.object({
        body: z.string().min(1).max(300),
        media: z.object({
            buffer: z.string(),
            mimetype: z.string()
        }).nullable()
    }))
    .mutation(async ({ ctx, input }) => {
        const fileName = input.media ? await uploadFile(input.media) : null
        return ctx.prisma.post.create({
            data: {
                userId: ctx.userId,
                body: input.body,
                media: fileName
            }
        })
    })

})