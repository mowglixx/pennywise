"use client"

import { useSession } from "next-auth/react"


const ManageIncomesPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>ManageIncomesPage</div>
  )
}
export default ManageIncomesPage