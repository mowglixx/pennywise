"use client"

import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { DataList, DataListItem, DataListItemLabel, DataListItemValue, DataListRoot, Grid, GridItem, Heading, Stack } from "@chakra-ui/react"
import { useContext, useMemo } from "react"
import 'chart.js/auto';
import { Chart } from "react-chartjs-2"
import { Prisma } from "@prisma/client";



const DashboardPage = () => {
    const { userData } = useContext(UserDataContext)

    const chartDataSet = useMemo(() => [
        {
            label: "Income",
            data: userData.incomes.map((income: Prisma.IncomeCreateWithoutUserInput) => Number(income.amount)).reduce((a, b) => a + b, 0)
        },
        {
            label: "Expenses",
            data: userData.expenses.map((expense: Prisma.ExpenseCreateWithoutUserInput) => Number(expense.amount)).reduce((a, b) => a + b, 0)
        },
        {
            label: "Bills",
            data: userData.bills.map((bill: Prisma.BillCreateWithoutUserInput) => Number(bill.amount)).reduce((a, b) => a + b, 0)
        },
        {
            label: "Shopping",
            data: userData.shopping.map((shopping: Prisma.ShoppingCreateWithoutUserInput) => Number(shopping.amount)).reduce((a, b) => a + b, 0)
        },
    ].filter(o => o.data !== 0), [userData.incomes, userData.bills, userData.expenses, userData.shopping]
    )
    // remove irrelevant data

    return (
        <>
            <GridItem>
                <Stack>
                    <Heading>
                        Dashboard
                    </Heading>

                    {chartDataSet && (
                        <Chart
                            type="doughnut"
                            data={{
                                labels: chartDataSet.map(o => o.label),
                                datasets: [{
                                    label: 'Amount',
                                    data: chartDataSet.map(o => o.data.toFixed(2)),
                                }]
                            }}
                            options={{
                                responsive: true
                            }}
                            redraw
                        />)
                    }
                </Stack>
            </GridItem>

            <GridItem>
                <Stack>
                    <Heading>
                        Summary
                    </Heading>
                    <DataListRoot>
                        <DataListItem >
                            <DataListItemLabel>a</DataListItemLabel>
                            <DataListItemValue>b</DataListItemValue>
                        </DataListItem>
                    </DataListRoot>
                </Stack>
            </GridItem>
        </>
    )
}
export default DashboardPage