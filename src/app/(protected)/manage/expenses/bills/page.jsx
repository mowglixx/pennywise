"use client"

import { useSession } from "next-auth/react"


const ManageBillsPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>Bills Page</div>
  )
}
export default ManageBillsPage