"use client"

import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { Heading, Stack } from "@chakra-ui/react"
import { useContext } from "react"
import 'chart.js/auto';
import { Pie } from "react-chartjs-2"
import { IncomeModel } from "@/lib/infrastructure/prismaRepository";



const DashboardPage = () => {
    const { userData } = useContext(UserDataContext)

    return (
        <Stack>
            <Heading>
                Dashboard
            </Heading>
            {userData?.incomes?.map && (
                <Pie
                    title="Incomes"
                    data={{
                        labels: [...userData.incomes.map((income: IncomeModel) => income.source)],
                        datasets: [{
                            label: 'Amount',
                            data: userData.incomes.map((income: IncomeModel) => Number(income.amount).toFixed(2)),
                        }]
                    }}
                />)
            }
        </Stack>
    )
}
export default DashboardPage