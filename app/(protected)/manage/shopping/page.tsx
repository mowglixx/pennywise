"use client"

import { Stack, Button, Heading, HStack, DataList, VisuallyHidden, Grid } from "@chakra-ui/react"
import { useContext } from "react"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

// local imports
import IncomeCardList from "@/components/molecules/IncomeCardList"

// Chakra UI Local Imports
import { LuPlus } from "react-icons/lu"
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import {
    ActionBarContent,
    ActionBarRoot,
} from "@/components/ui/action-bar"

function IncomesPage() {

    const { userData } = useContext(UserDataContext)
    const { selectedResource, setActionForm } = useActionDrawer()


    return (
        <>
            <Grid templateColumns={{ base: "2fr 1fr", mdDown: "1fr" }} gap={5} pb={'20'}>
                <Stack order={{ mdDown: 0 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <Heading>
                        Summary
                    </Heading>
                    <Stack>

                        {userData.incomes?.length && userData.incomes?.map && (
                            <>
                                <Stack direction={{ base: 'column' }}>
                                    <Stack py={'5'} maxW={{ base: "600px" }}>
                                        <Chart
                                            type="doughnut"
                                            data={{
                                                labels: [...userData.incomes.map((income) => income.source)],
                                                datasets: [{
                                                    label: 'Income',
                                                    data: userData.incomes.map((income) => Number(income.amount).toFixed(2)),
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
            <ActionBarRoot open={true}>
                <ActionBarContent>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Shopping", "create", undefined)
                    }} aria-labelledby="AddIncomeFormButton">
                        <HStack>
                            <LuPlus />
                            <VisuallyHidden id="AddIncomeFormButton">
                                Add Income
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Shopping", "update", selectedResource.selectedResource)
                    }} aria-labelledby="AddIncomeFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuPlus />
                            <VisuallyHidden id="AddIncomeFormButton">
                                Add Income
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Shopping", "delete", selectedResource.selectedResource)
                    }} aria-labelledby="AddIncomeFormButton" disabled={!selectedResource.selectedResource}>
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



