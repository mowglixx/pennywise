import NextAuth from "next-auth"
import { nextAuthConfig } from "@/auth.config"

export const { auth: middleware } = NextAuth(nextAuthConfig)


export const config = {
    matcher: [
        "/manage",
        "/dashboard",
        "/help",
        "/api"
    ]
}