import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
// protectedProcedure 
import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import filterUser from '~/server/helpers/filterUser';

export const usersRouter = createTRPCRouter({
    getOneById: publicProcedure
    .input(z.string().min(1)).query(async ({ input }) => {
        const foundUser = await clerkClient.users.getUser(input)

        if (!foundUser) throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'User not found'
        })

        return filterUser(foundUser)
    }),

})