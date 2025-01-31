"use client"

import { useSession } from "next-auth/react"


const ManageAdhocExpensesPage = () => {
    const { data, status } = useSession()
    
  return (
    <div>Adhoc Expenses
     Page</div>
  )
}
export default ManageAdhocExpensesPage