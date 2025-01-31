"use client"

import { useSession } from "next-auth/react"


const ManageAccountPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>Account</div>
  )
}
export default ManageAccountPage