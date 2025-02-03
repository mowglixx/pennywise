export { auth as middleware } from "@/auth"

// Doesn't work =/ not sure why
// export { default } from "next-auth/middleware"


export const config = {
    matcher: [
        "/manage",
        "/dashboard",
        "/help",
        "/api"
    ]
}