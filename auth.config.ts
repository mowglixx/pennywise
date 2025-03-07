// Providers
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"

// Notice this is only an object, not a full Auth.js instance
export const nextAuthConfig = {
  providers: [Google({
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
      },
    },
  }
  )],
} satisfies NextAuthConfig