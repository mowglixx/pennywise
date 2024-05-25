"use client"

import { ToolbarContext } from "@/components/Contexts"
import { AddIncomeForm, DeleteIncomeForm, EditIncomeForm } from "@/components/forms/manage/income"
import { calculateNextPayday } from "@/lib/tools/compare-dates"
import { Card, CardContent, CardHeader, Chip, Skeleton, Stack } from "@mui/material"
import { useSession } from "next-auth/react"
import { Suspense, useContext, useEffect, useState } from "react"


const ManageIncomesPage = () => {
  const { data, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [incomes, setIncomes] = useState([])
  const { toolbarState, setToolbarState } = useContext(ToolbarContext)



  useEffect(() => {
    if (status === "authenticated") {
      fetch('/api/income')
      .then(res => res.json())
      .then(json => {
        setIncomes(json) 
        return json })
      .then(json => console.log({incomes: json}))
      .then(() => {setToolbarState({
        resource: 'income',
        selectedItem: null,
        forms: {
          add: <AddIncomeForm />, 

        }
      })})
    }
  }, [status])

  return (
        <Suspense fallback={(<Skeleton variant="circular" width={40} height={40} />)}>
      <Stack direction={'row'} spacing={2} py={2} px={0}>
        {incomes.map((income, li) =>{
          return income.type.map((type,ti) => (<Chip key={`${type}-${ti}`} label={type} />))
        })}
      </Stack>
      <Stack spacing={2}>

        {!!incomes.length && incomes.map((income) => {
          return (
            <Card key={income?._id} variant='elevation' elevation={toolbarState.selectedItem === income ? 4 : 2} onClick={() => {
              setToolbarState({
                ...toolbarState, 
                selectedItem: toolbarState.selectedItem === income ? null : income,
                forms: {
                ...toolbarState.forms,
                  edit: <EditIncomeForm income={income}/>,
                  delete: <DeleteIncomeForm income={income}/>, 
                }
              })
            }}>
              <CardHeader
                title={`£ ${(income?.amount / 100).toFixed(2)}`}
                subheader={`${income?.name || 'Mysterious Income'}${income?.type?.length?' - '+income.type.join(', '):''}`}
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
        </Suspense>
  )
}
export default ManageIncomesPage
