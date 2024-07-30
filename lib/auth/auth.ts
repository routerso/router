// @ts-ignore
import { NextAuthOptions, DefaultSession } from "next-auth/next";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "../db/db";
import { sendVerificationRequest } from "./verification";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    {
      id: "resend",
      type: "email",
      sendVerificationRequest,
    },
  ],
  callbacks: {
    async session({ token, session, user }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
    async jwt({ token, user }: any) {
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email))
        .limit(1);

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/check-email",
  },
};
