"use client"

import { BreadcrumbsContext, ToolbarContext } from "@/components/Contexts"
import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"


const ManageExpensesPage = () => {
    const { data, status } = useSession()
    const [loading, setLoading] = useState(true)
    const [incomes, setIncomes] = useState([])
    const { setToolbarState } = useContext(ToolbarContext)

    useEffect(() => {
      setLoading(status === 'loading')
      if (status === "authenticated") {
        fetch('/api/expenses').then(res => res.json()).then(json => {
          setIncomes(json)
        }).then(() => {setToolbarState('expenses')})
      }
    }, [status, setToolbarState])
    
  return (
    <div>ExpensesPage</div>
  )
}
export default ManageExpensesPage