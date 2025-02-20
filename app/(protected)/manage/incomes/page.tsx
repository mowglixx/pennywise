"use client"

import { Stack, Button, Heading, HStack, Text, Separator, DataList, Portal, VisuallyHidden, Grid, GridItem, EmptyState } from "@chakra-ui/react"
import { useContext } from "react"
import 'chart.js/auto';
import { Pie, Chart } from 'react-chartjs-2';

// local imports
// import { CreateIncomeForm, UpdateIncomeForm } from "@/components/molecules/Forms/Income"
import IncomeCardList from "@/components/molecules/IncomeCardList"

// Chakra UI Local Imports
import { LuClipboardPen, LuPencil, LuPlus, LuTrash } from "react-icons/lu"
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import {
    ActionBarCloseTrigger,
    ActionBarContent,
    ActionBarRoot,
    ActionBarSelectionTrigger,
    ActionBarSeparator,
} from "@/components/ui/action-bar"
import { Prisma } from "@prisma/client";

function IncomesPage() {

    const { userData } = useContext(UserDataContext)
    const { selectedResource, setActionForm } = useActionDrawer()


    if (userData.incomes.length < 1) return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <LuClipboardPen />
                </EmptyState.Indicator>
                <EmptyState.Title>
                    You have no Incomes
                </EmptyState.Title>
                <EmptyState.Description>

                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Income", "create", undefined)
                    }} aria-labelledby="AddIncomeFormButton">
                        <LuPlus />
                        <Text id="AddIncomeFormButton">
                            Add Income
                        </Text>
                    </Button>
                </EmptyState.Description>
            </EmptyState.Content>
        </EmptyState.Root>
    )

    return (
        <>

                <GridItem order={{ mdDown: 0 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <Heading>
                        Summary
                    </Heading>
                    <Stack>

                        {userData.incomes?.length && userData.incomes?.map && (
                            <>
                                <Stack direction={{ base: 'column' }}>
                                    <Stack py={'5'} maxW={{ base: "600px" }}>
                                        <Chart
                                            redraw
                                            type="doughnut"
                                            data={{
                                                labels: [...userData.incomes.map((income: Prisma.IncomeCreateWithoutUserInput) => income.source)],
                                                datasets: [{
                                                    label: 'Income',
                                                    data: userData.incomes.map((income: Prisma.IncomeCreateWithoutUserInput) => Number(income.amount).toFixed(2)),
                                                }]
                                            }}
                                        />
                                    </Stack>
                                    <DataList.Root variant={'bold'} orientation="horizontal" justifyContent={'center'}>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Incomes Sources</DataList.ItemLabel>
                                            <DataList.ItemValue>{userData.incomes.length}</DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                        <DataList.ItemLabel>Top Income</DataList.ItemLabel>
                                        <DataList.ItemValue>{`${userData.incomes.sort((a, b) => Number(a.amount) - Number(b.amount))?.[0].source} - ${userData.incomes.sort((a, b) => Number(a.amount) - Number(b.amount))?.[0].description}`}</DataList.ItemValue>
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

                </GridItem>
                <GridItem order={{ mdDown: 1 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <IncomeCardList incomes={userData.incomes} />
            </GridItem>
            <ActionBarRoot open={true}>
                <ActionBarContent>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Income", "delete", selectedResource.selectedResource)
                    }} aria-labelledby="DeleteIncomeFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuTrash />
                            <VisuallyHidden id="DeleteIncomeFormButton">
                                Delete Income
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Income", "update", selectedResource.selectedResource)
                    }} aria-labelledby="EditIncomeFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuPencil />
                            <VisuallyHidden id="EditIncomeFormButton">
                                Edit Income
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <ActionBarSeparator />
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Income", "create", undefined)
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



