import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { uploadFile, getFileURL } from '~/utils/s3';

export const postsRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany()

        const postsWithMedia = await Promise.all(posts.map(async (post) => {
            if (post.media === null) return post

            const postImgLink = await getFileURL(post.media as string)
            post.link = postImgLink
            return post
        }))

        return postsWithMedia
    }),

    createOne: protectedProcedure
    .input(z.object({
        body: z.string(),
        media: z.object({
            buffer: z.string(),
            mimetype: z.string()
        }).optional()
    }))
    .mutation(async ({ ctx, input }) => {
        console.log(input)
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