"use client"

import { Skeleton } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const RootLayout = ({children}) => {
    const session = useSession()
    const router = useRouter()

    switch (session.status) {
        case "authenticated":
            return (<>{children}</>)    
        case "unauthenticated":
            return router.push('/')    
        default:
            return (<Skeleton />)
    }
}
export default RootLayout