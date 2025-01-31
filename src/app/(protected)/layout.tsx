"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const SessionProtectionLayout = ({ children }) => {
    const session = useSession()
    const router = useRouter()
    
    // protects the manage route with session requirements
    if (!session) {
        return <>Unauthorised.</>
        router.push('/')
    }
    return (<>{children}</>)  
}
export default SessionProtectionLayout