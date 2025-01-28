"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const SessionProtectionLayout = ({ children }) => {
    const session = useSession()
    const router = useRouter()
    // protects the manage route with session requirements
    switch (session.status) {
        case "authenticated":
            return (<>{children}</>)
        case "unauthenticated":
            return router.push('/')
        default:
            return (<></>)
    }
}
export default SessionProtectionLayout