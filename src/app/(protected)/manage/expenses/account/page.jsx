"use client"

import { useSession } from "next-auth/react"


const ManageAccountPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>Account Page</div>
  )
}
export default ManageAccountPage