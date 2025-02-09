import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/prisma"


const AUTH_SECRET = process.env.AUTH_SECRET
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google({authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },}
  )],
  secret: AUTH_SECRET,
  session:{
    strategy: "jwt"
  },
})