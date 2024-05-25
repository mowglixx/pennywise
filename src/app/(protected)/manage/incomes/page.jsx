"use client"

import { BreadcrumbsContext, ToolbarContext } from "@/components/Contexts"
import { calculateNextPayday } from "@/lib/tools/compare-dates"
import { Card, CardContent, CardHeader, Chip, Stack } from "@mui/material"
import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"


const ManageIncomesPage = () => {
  const { data, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [incomes, setIncomes] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const { toolbarState, setToolbarState } = useContext(ToolbarContext)
  const { setPageData } = useContext(BreadcrumbsContext)


  // useEffect(() => {
  //   setPageData('Incomes')
  // }, [])
  useEffect(() => {
    setLoading(status === 'loading')
    if (status === "authenticated") {
      fetch('/api/income')
      .then(res => res.json())
      .then(json => setIncomes(json))
      .then(() => {setToolbarState({
        resource: 'income',
        selectedId: null,
      })})
      .then(() => {setPageData('Income')})
    }
  }, [status])
  return (
    <>
      {/* <pre>
        {JSON.stringify({
          incomes,
          session: { data, status },
          loading,
        },null, 3)}
      </pre> */}
      <Stack direction={'row'} spacing={2} py={2} px={0}>
        {incomes.map((income, li) =>{
          return income.type.map((type,ti) => (<Chip key={`${type}-${ti}`} label={type} />))
        })}
      </Stack>
      <Stack spacing={4}>
        {!!incomes.length && incomes.map((income) => {
          return (
            <Card key={income?._id} variant='elevation' elevation={toolbarState.selectedId === income?._id ? 0: 3} onClick={() => {
              setSelectedId(income?._id)
              setToolbarState({...toolbarState, selectedId: income?._id})
            }}>
              <CardHeader
                title={`£ ${(income?.amount / 100).toFixed(2)}`}
                subheader={`${income?.name || 'Mysterious Income'}${income?.type?.length&&' - '+income.type.join(', ')}`}
                />
              <CardContent>
                <Stack direction={'row'} spacing={2}>
                  <Chip title={'Payday'} label={`${new Date(income.paymentFrequency.startDate).toLocaleString('en-gb', { month: "short", day: "numeric" })}`} />
                  <Chip variant="outlined" title={'Next Payday'} label={`${calculateNextPayday(new Date(), income.paymentFrequency).toLocaleString('en-gb', { year: "2-digit", month: "short", day: "numeric" })}`} />
                </Stack>
              </CardContent>
            </Card>)
        })}
      </Stack>
    </>
  )
}
export default ManageIncomesPage
