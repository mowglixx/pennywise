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
            selectedAction: "add", 
            forms: {
              add: {
                action: "add",
                label: "Add New Income",
                component: <AddIncomeForm />
              }
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
        <div>
          {!!incomes.length && (
            <div>
                <div>
                {'Income Summary'}
                </div>
                <div>
                <p variant="caption">£ {(incomes.reduce((income, current) => income.amount + current.amount).amount /100).toFixed(2)}</p>
                </div>
            </div>
          )}
        </div>

      <div>
        <div>
          {!!incomes.length ? incomes.map((income) => {
            return (
              <button key={income?._id} sx={{ cursor: 'pointer' }} variant='elevation' elevation={toolbarState.selectedItem === income ? 4 : 2} onClick={() => {
                setToolbarState({
                  ...toolbarState,
                  selectedItem: toolbarState.selectedItem === income ? null : income,
                  selectedAction: "add",
                  forms: {
                    ...toolbarState.forms,
                    edit: {
                      action: "edit", 
                      label: `Edit ${income?.name}`,
                      component: <EditIncomeForm income={income} />
                    },
                    delete: {
                      action: "delete", 
                      label: `Delete ${income?.name}`,
                      component: <DeleteIncomeForm income={income} />}
                  }
                })
              }}>
                <div>
                <h1>{`£ ${(income?.amount / 100).toFixed(2)}`}</h1>
                <h2>{`${income?.name || 'Income'}${income?.tags?.length ? ' - ' + income.tags.join(', ') : ''}`}</h2>
                </div>
                <div>
                  <div direction={'row'} spacing={2}>
                    <div title={'Next Payday'}>
                      {`Next Payday ${calculateNextPayday(new Date(), income.frequency).toLocaleString('en-gb', { year: "2-digit", month: "short", day: "numeric" })}`}</div>
                  </div>
                </div>
              </button>)
          }) : <AddIncomeForm />}
        </div>
      </div>
      {}
    </div >
  )
};
