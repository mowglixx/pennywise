import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import clientPromise from "./lib/db";
import Google from "@auth/core/providers/google";

const AUTH_SECRET = process.env.AUTH_SECRET;

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: AUTH_SECRET,
  providers: [Google],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }
});
