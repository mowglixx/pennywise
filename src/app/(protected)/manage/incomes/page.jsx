"use client"

import { Card, CardContent, CardHeader, Stack } from "@mui/material"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


const ManageIncomesPage = () => {
  const { data, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [incomes, setIncomes] = useState([])

  useEffect(() => {
    setLoading(status === 'loading')
    if (status === "authenticated") {
      fetch('/api/income').then(res => res.json()).then(json => {
        setIncomes(json)
      })
    }
  }, [status])
  return (
    <>
      <pre>
        {console.log(incomes, null, 2)}
      </pre>
      <Stack>
        {!!incomes.length && incomes.map((income) => {
          return (
            <Card key={income?._id} variant="outlined">
              <CardHeader
                title={income?.name || 'Mysterious Income'}
                subheader={`£ ${(income?.amount / 100).toFixed(2)}`} />
              <CardContent>
                Next payday: { }
              </CardContent>
            </Card>)
        })}
      </Stack>
    </>
  )
}
export default ManageIncomesPage