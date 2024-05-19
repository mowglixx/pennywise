"use client"

import { useSession } from "next-auth/react"


const ManageExpensesPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>ExpensesPage</div>
  )
}
export default ManageExpensesPage