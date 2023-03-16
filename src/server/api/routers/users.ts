import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
    getOneByEmail: publicProcedure
    .input(z.object({
        email: z.string(),
      }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findUnique({
        where: {
            email: input.email,
        },
        });
    }),

    getOneByUsername: publicProcedure
    .input(z.object({
        userName: z.string(),
      }))
    .query(({ ctx, input }) => {
        return ctx.prisma.user.findUnique({
        where: {
            userName: input.userName
        },
        });
    }),

    createOne: publicProcedure
    .input(z.object({
        userName: z.string(),
        name: z.string(),
        email: z.string(),
        image: z.string(),
        bio: z.string(),
    }))
    .mutation(({ ctx, input }) => {
        return ctx.prisma.user.create({
            data: {
                userName: input.userName,
                name: input.name,
                email: input.email,
                image: input.image,
                bio: input.bio
            },
        })
    })
})