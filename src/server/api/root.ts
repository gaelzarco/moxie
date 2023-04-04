import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "~/server/api/routers/posts";
import { usersRouter } from "~/server/api/routers/users";
import { repliesRouter } from "~/server/api/routers/replies";
import { likesRouter } from "~/server/api/routers/likes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  users: usersRouter,
  replies: repliesRouter,
  likes: likesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
