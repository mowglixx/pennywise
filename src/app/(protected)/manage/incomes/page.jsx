"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


const ManageIncomesPage = () => {
    const { data, status } = useSession()
    const [loading, setLoading] = useState(true)
    const [incomes, setIncomes] = useState({})

    useEffect(() => {
        setLoading(status === 'loading')
    }, [status])
    useEffect(()=>{
        if(!loading){
          fetch('/api/income').then(res => res.json()).then(json => {
            setIncomes(json)
          })
        }
    }, [loading])
  return (
    <pre>{JSON.stringify(incomes, null, 2)}</pre>
  )
}
export default ManageIncomesPage