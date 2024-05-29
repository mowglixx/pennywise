"use client"

import { ToolbarContext } from "@/components/Contexts"
import { AddIncomeForm, DeleteIncomeForm, EditIncomeForm } from "@/components/forms/manage/income"
import { calculateNextPayday } from "@/lib/tools/compare-dates"
import { Add } from "@mui/icons-material"
import { Box, Card, CardContent, CardHeader, Chip, Fab, Paper, Portal, Skeleton, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Suspense, useContext, useEffect, useState } from "react"


const ManageIncomesPage = () => {
  const { data, status } = useSession()
  const [incomes, setIncomes] = useState([])
  const { toolbarState, setToolbarState } = useContext(ToolbarContext)


  useEffect(() => {
    if (status === "authenticated") {
      fetch('/api/income', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(json => {
          incomes !== json && setIncomes(json)
          return json
        })
        // .then(json => console.log({incomes: json}))
        .then(() => {
          setToolbarState({
            resource: 'income',
            selectedItem: null,
            forms: {
              add: <AddIncomeForm />,

            }
          })
        })
    }
  }, [status, incomes, setToolbarState])

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography variant="h2">
          Incomes List
        </Typography>
        <Typography>
          Here you can add incomes, this can be Wages from work, Benefits, Odd Jobs, Dividends... anything that gives you an income.
        </Typography>
        <Typography>
          List it here with the frequency and date you&apos;re usually paid, this will allow you to check your next payday straight away!
        </Typography>
      </Grid>
        <Grid xs={12} md={6}>
          {!!incomes.length && (
            <Card>
                <CardHeader title={'Income Summary'} />
                <CardContent>
                <Typography variant="caption">Coming Soon</Typography>
                </CardContent>
            </Card>
          )}
        </Grid>

      <Grid xs={12} md={6}>
        <Stack rowGap={2} sx={{
          minHeight: '80svh',
          overflowY: !!incomes.length ? 'scroll' : undefined
        }}>
          {!!incomes.length ? incomes.map((income) => {
            return (
              <Card key={income?._id} variant='elevation' elevation={toolbarState.selectedItem === income ? 4 : 2} onClick={() => {
                setToolbarState({
                  ...toolbarState,
                  selectedItem: toolbarState.selectedItem === income ? null : income,
                  forms: {
                    ...toolbarState.forms,
                    edit: <EditIncomeForm income={income} />,
                    delete: <DeleteIncomeForm income={income} />,
                  }
                })
              }}>
                <CardHeader
                  title={`£ ${(income?.amount / 100).toFixed(2)}`}
                  subheader={`${income?.name || 'Income'}${income?.type?.length ? ' - ' + income.type.join(', ') : ''}`}
                />
                <CardContent>
                  <Stack direction={'row'} spacing={2}>
                    <Chip
                      variant="outlined"
                      title={'Next Payday'}
                      label={`Next Payday ${calculateNextPayday(new Date(), income.paymentFrequency).toLocaleString('en-gb', { year: "2-digit", month: "short", day: "numeric" })}`} />
                  </Stack>
                </CardContent>
              </Card>)
          }) : <>😑 Oops, best add some incomes...</>}
        </Stack>
      </Grid>

{/* Staged FAB implementation */}
      {/* <Box sx={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        display: 'flex',
        gap: '16px'
      }}>
        <Fab>
          <Add />
        </Fab>
        <Fab>
          <Add />
        </Fab>
        <Fab>
          <Add />
        </Fab>
        <Fab>
          <Add />
        </Fab>
      </Box> */}
    </Grid >
  )
}
export default ManageIncomesPage
