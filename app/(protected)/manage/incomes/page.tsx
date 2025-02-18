"use client"

import { Stack, Button, Heading, HStack, Text, Separator, DataList, Portal, VisuallyHidden, Grid } from "@chakra-ui/react"
import { useContext } from "react"
import 'chart.js/auto';
import { Pie, Chart } from 'react-chartjs-2';

// local imports
// import { CreateIncomeForm, UpdateIncomeForm } from "@/components/molecules/Forms/Income"
import IncomeCardList from "@/components/molecules/IncomeCardList"

// Chakra UI Local Imports
import { LuPlus } from "react-icons/lu"
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { IncomeModel } from "@/lib/infrastructure/prismaRepository";
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import {
    ActionBarCloseTrigger,
    ActionBarContent,
    ActionBarRoot,
    ActionBarSelectionTrigger,
    ActionBarSeparator,
} from "@/components/ui/action-bar"


function IncomesPage() {

    const { userData } = useContext(UserDataContext)
    const { setActionForm } = useActionDrawer()


    return (
        <>

            <Grid templateColumns={{ base: "2fr 1fr", mdDown: "1fr" }} gap={5} pb={'20'} >
                <Stack order={{ mdDown: 0 }} position={'sticky'} as={'section'} direction={{ base: 'column' }} aria-labelledby="incomeSummaryHeading">
                        <Heading id="incomeSummaryHeading">
                            Summary
                        </Heading>
                        <Stack>

                            {userData.incomes?.length && userData.incomes?.map && (
                                <>
                                    <Stack direction={{ base: 'column' }}>
                                        <Stack py={'5'}>
                                        <Chart
                                            type="doughnut"
                                                data={{
                                                    labels: [...userData.incomes.map((income: IncomeModel) => income.source)],
                                                    datasets: [{
                                                        label: 'Income',
                                                        data: userData.incomes.map((income: IncomeModel) => Number(income.amount).toFixed(2)),
                                                    }]
                                                }}
                                            redraw
                                            />
                                        </Stack>
                                        <DataList.Root variant={'bold'} orientation="horizontal" justifyContent={'center'}>
                                            <DataList.Item>
                                                <DataList.ItemLabel>Incomes Sources</DataList.ItemLabel>
                                                <DataList.ItemValue>{userData.incomes.length}</DataList.ItemValue>
                                            </DataList.Item>
                                            <DataList.Item>
                                                <DataList.ItemLabel>Total Income</DataList.ItemLabel>
                                                <DataList.ItemValue>£ {userData.incomes.reduce((prev, current) => { return prev + Number(current.amount) }, 0).toFixed(2)}</DataList.ItemValue>
                                            </DataList.Item>
                                        </DataList.Root>
                                    </Stack>
                                </>
                            )
                        }
                        </Stack>

                    </Stack>
                <IncomeCardList incomes={userData.incomes} />
                </Grid>
            <ActionBarRoot open>
                <ActionBarContent>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("income", "create", undefined)
                    }} aria-labelledby="AddIncomeFormButton">
                        <HStack>
                            <LuPlus />
                            <VisuallyHidden id="AddIncomeFormButton">
                                Add Income
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                </ActionBarContent>
            </ActionBarRoot>
        </>
    )
}

export default IncomesPage



