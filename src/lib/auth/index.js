import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import clientPromise from "./lib/db";
import Google from "@auth/core/providers/google";

const AUTH_SECRET = process.env.AUTH_SECRET;

// Google
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  secret: AUTH_SECRET,
  providers: [Google],
});
