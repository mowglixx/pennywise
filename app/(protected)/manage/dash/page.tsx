"use client"

import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { Heading, Stack } from "@chakra-ui/react"
import { useContext } from "react"
import 'chart.js/auto';
import { Chart } from "react-chartjs-2"
import { Prisma } from "@prisma/client";



const DashboardPage = () => {
    const { userData } = useContext(UserDataContext)

    return (
        <Stack>
            <Heading>
                Dashboard
            </Heading>
            {userData?.incomes?.map && (
                <Chart
                    type="doughnut"
                    title="Incomes"
                    data={{
                        labels: [...userData.incomes.map((income: Prisma.IncomeCreateWithoutUserInput) => income.source)],
                        datasets: [{
                            label: 'Amount',
                            data: userData.incomes.map((income: Prisma.IncomeCreateWithoutUserInput) => Number(income.amount).toFixed(2)),
                        }]
                    }}
                    redraw
                />)
            }
        </Stack>
    )
}
export default DashboardPage