"use client"

import { useSession } from "next-auth/react"


const ManageFoodBudgetPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>Food Budget Page</div>
  )
}
export default ManageFoodBudgetPage