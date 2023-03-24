import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import type { User } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        userName: { label: "Username", type: "text", placeholder: "Username" },
        name: { label: "Name", type: "text", placeholder: "Name" },
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        image: { label: 'Profile Picture', type: 'text', placeholder: 'Profile Picture' },
        bio: { label: 'Add a bio!', type: 'text-input', placeholder: 'Bio' }
      },
      async authorize(credentials): Promise<User | null> {
          const { userName, name, email, image, bio } = credentials as {
            userName: string;
            name: string;
            email: string;
            image: string;
            bio: string;
          };
          if (!userName || !name || !email || !image || !bio) {
            return null;
          } else {
            const user = await prisma.user.upsert({
              where: { email: email },
              update: { userName, name, email, image, bio },
              create: { userName, name, email, image, bio },
            });
            return user;
          }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret: env.NEXTAUTH_SECRET,
  pages: {
    newUser: "auth/gettingstarted"
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};