"use client"

import { Stack, Button, Heading, HStack, Text, DataList, VisuallyHidden, Grid, GridItem, EmptyState } from "@chakra-ui/react"
import { useContext, useMemo } from "react"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

// local imports
import ExpenseCardList from "@/components/molecules/ExpenseCardList"

// Chakra UI Local Imports
import { LuPencil, LuPlus, LuTrash } from "react-icons/lu"
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import {
    ActionBarContent,
    ActionBarRoot,
    ActionBarSeparator,
} from "@/components/ui/action-bar"
import { Prisma } from "@prisma/client";

function ExpensesPage() {

    const { userData } = useContext(UserDataContext)
    const { selectedResource, setActionForm } = useActionDrawer()

    const expenses = useMemo(() => {
        return userData.expenses
    }, [userData.expenses])


    if (expenses.length < 1) {
        return (<EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    {/* <LuClipboardPen /> */}
                    🙄
                </EmptyState.Indicator>
                <EmptyState.Title>
                    You have no expenses, must be nice.
                </EmptyState.Title>
                <EmptyState.Description>

                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Expense", "create", undefined)
                    }} aria-labelledby="AddExpenseFormButton">
                        <LuPlus />
                        <Text id="AddExpenseFormButton">
                            Add an Expense
                        </Text>
                    </Button>
                </EmptyState.Description>
            </EmptyState.Content>
        </EmptyState.Root>)
    }

    return (
        <>
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={5} pb={'20'}>

                <GridItem order={{ mdDown: 0 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <Heading>
                        Summary
                    </Heading>
                    <Stack>

                        {expenses?.length && expenses?.map && (
                            <>
                                <Stack direction={{ base: 'column' }}>
                                    <Stack py={'5'}>
                                        <Chart
                                            type="doughnut"
                                            data={{
                                                labels: [...expenses.map((expense: Prisma.ExpenseCreateWithoutUserInput) => expense.description)],
                                                datasets: [{
                                                    label: 'Expense',
                                                    data: [...expenses.map((expense: Prisma.ExpenseCreateWithoutUserInput) => Number(expense.amount).toFixed(2))],
                                                }]
                                            }}
                                            options={{
                                                responsive: true,
                                            }}
                                        />
                                    </Stack>
                                    <DataList.Root variant={'bold'} orientation="horizontal" justifyContent={'center'}>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Expense Sources</DataList.ItemLabel>
                                            <DataList.ItemValue>{expenses.length}</DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Top Expense</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                {`${expenses.sort(
                                                    (a, b) => Number(a.amount) - Number(b.amount))?.[0].source} - ${expenses.sort((a, b) => Number(a.amount) - Number(b.amount))?.[0].description}`}
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Total Expenses</DataList.ItemLabel>
                                            <DataList.ItemValue>£ {expenses.reduce((prev, current) => { return prev + Number(current.amount) }, 0).toFixed(2)}</DataList.ItemValue>
                                        </DataList.Item>
                                    </DataList.Root>
                                </Stack>
                            </>
                        )
                        }
                    </Stack>

                </GridItem>
                <GridItem order={{ mdDown: 1 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <ExpenseCardList expenses={userData.expenses} />
                </GridItem>
            </Grid>
            <ActionBarRoot open={true}>
                <ActionBarContent>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Expense", "delete", selectedResource.selectedResource)
                    }} aria-labelledby="DeleteExpenseFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuTrash />
                            <VisuallyHidden id="DeleteExpenseFormButton">
                                Delete Expense
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Expense", "update", selectedResource.selectedResource)
                    }} aria-labelledby="EditExpenseFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuPencil />
                            <VisuallyHidden id="EditExpenseFormButton">
                                Edit Expense
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <ActionBarSeparator />
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Expense", "create", undefined)
                    }} aria-labelledby="AddExpenseFormButton">
                        <HStack>
                            <LuPlus />
                            <VisuallyHidden id="AddExpenseFormButton">
                                Add Expense
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                </ActionBarContent>
            </ActionBarRoot>
        </>
    )
}

export default ExpensesPage



