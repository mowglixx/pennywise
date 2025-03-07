import NextAuth from "next-auth"
import { prisma } from "@/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { nextAuthConfig } from '@/auth.config'


const AUTH_SECRET = process.env.AUTH_SECRET
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: AUTH_SECRET,
  session:{
    strategy: "jwt"
  },
  ...nextAuthConfig
})