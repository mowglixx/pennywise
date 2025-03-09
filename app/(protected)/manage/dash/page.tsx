"use client"

import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { DataListItem, DataListItemLabel, DataListItemValue, DataListRoot, GridItem, Heading, Stack } from "@chakra-ui/react"
import { useContext, useMemo } from "react"
import 'chart.js/auto';
import { Chart } from "react-chartjs-2"
import { Prisma } from "@prisma/client";

// Coming Soon
// import { DataListItem, DataListItemLabel, DataListItemValue, DataListRoot} from "@chakra-ui/react"

const DashboardPage = () => {
    const { userData } = useContext(UserDataContext)

    const chartDataSet = useMemo(() => [
        {
            label: "Incomes",
            data: userData.incomes.map((income: Prisma.IncomeCreateWithoutUserInput) => Number(income.amount) * income.paydays.length ).reduce((a, b) => a + b, 0)
        },
        {
            label: "General Expenses",
            data: userData.expenses.map((expense: Prisma.ExpenseCreateWithoutUserInput) => Number(expense.amount)).reduce((a, b) => a + b, 0)
        },
        {
            label: "Bill Expenses",
            data: userData.bills.map((bill: Prisma.BillCreateWithoutUserInput) => Number(bill.amount)).reduce((a, b) => a + b, 0)
        },
        {
            label: "Shopping Expenses",
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

                </Stack>
            </GridItem>

            <GridItem>
                {chartDataSet && userData?.incomes?.length ? (
                    <Stack>
                        <Heading>
                            Summary
                        </Heading>
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
                        />
                    {/* Coming Soon */}
                        <DataListRoot orientation={'horizontal'}>
                            {
                                chartDataSet.map((data) => (
                                    <DataListItem key={data.label}>
                                        <DataListItemLabel>{data.label}</DataListItemLabel>
                                        <DataListItemValue>£ {data.data}</DataListItemValue>
                                    </DataListItem>
                                ))}
                        </DataListRoot>
                </Stack>
                ) : null}
            </GridItem>
        </>
    )
}
export default DashboardPage