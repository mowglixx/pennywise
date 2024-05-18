import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import clientPromise from "./lib/db"
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github"

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.AUTH_SECRET || "SUPERSECURESECRETDONTTELLANYBODYEVEROMG",
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})