"use client"

import { useSession } from "next-auth/react"


const ManagePurchasesPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>Purchases Page</div>
  )
}
export default ManagePurchasesPage