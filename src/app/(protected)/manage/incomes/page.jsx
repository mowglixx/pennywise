"use client"

import { useSession } from "next-auth/react"
import { useContext, useEffect, useState } from "react"

// local imports
import { ToolbarContext } from "@/components/Contexts"
import { AddIncomeForm, DeleteIncomeForm, EditIncomeForm } from "@/components/forms/manage/income"
import { calculateNextPayday } from "@/lib/tools/compare-dates"

export default function ManageIncomesPage(){
  
  const { status } = useSession();
  const [ incomes, setIncomes ] = useState([]);
  const { toolbarState, setToolbarState } = useContext(ToolbarContext);


  // useEffect()
  useEffect(() => {
    if (status === "authenticated") {
      fetch('/api/incomes', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(json => {
          incomes?.length !== json?.length && setIncomes(json)
          return json
        })
        // .then(json => console.log({incomes: json}))
        .then(() => {
          setToolbarState({
            resource: 'income',
            selectedItem: null,
            forms: {
              add: <AddIncomeForm />
            }
          })
        })

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, incomes]);

  return (
    <div>
    <div>

        <h2>
          Incomes List
        </h2>
        <p>
          Here you can add incomes, this can be Wages from work, Benefits, Odd Jobs, Dividends... anything that gives you an income.
        </p>
        <p>
          List it here with the frequency and date you&apos;re usually paid, this will allow you to check your next payday straight away!
        </p>
      </div>
        <div xs={12} md={6}>
          {!!incomes.length && (
            <div>
                <div title={'Income Summary'} />
                <div>
                <p variant="caption">Coming Soon</p>
                </div>
            </div>
          )}
        </div>

      <div xs={12} md={6}>
        <div rowGap={2} sx={{
          overflowY: !!incomes.length ? 'scroll' : undefined
        }}>
          {!!incomes.length ? incomes.map((income) => {
            return (
              <div key={income?._id} sx={{ cursor: 'pointer' }} variant='elevation' elevation={toolbarState.selectedItem === income ? 4 : 2} onClick={() => {
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
                <div
                  title={`£ ${(income?.amount / 100).toFixed(2)}`}
                  subheader={`${income?.name || 'Income'}${income?.tags?.length ? ' - ' + income.tags.join(', ') : ''}`}
                />
                <div>
                  <div direction={'row'} spacing={2}>
                    <div
                      variant="outlined"
                      title={'Next Payday'}
                      label={`Next Payday ${calculateNextPayday(new Date(), income.frequency).toLocaleString('en-gb', { year: "2-digit", month: "short", day: "numeric" })}`} />
                  </div>
                </div>
              </div>)
          }) : <p>No incomes found...</p>}
        </div>
      </div>
    </div >
  )
};
