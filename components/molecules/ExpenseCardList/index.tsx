"use client"
import { prisma } from "@/prisma";
import { Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import ExpenseCard from "@/components/atoms/ExpenseCard";
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import { Prisma } from "@prisma/client";


export interface ExpenseCardListProps {
    expenses: Prisma.ExpenseCreateWithoutUserInput[],
}

const ExpenseCardList = ({ expenses }: ExpenseCardListProps) => {

    const { selectedResource, selectResource } = useActionDrawer()



    if (expenses?.length < 1) return null


    return (
        <Stack>
            <Heading>Expense List</Heading>
            <Grid as={'ul'} gap={'5'} templateColumns={"1fr"}>
                {expenses.map((expense, i) => <ExpenseCard key={expense.id} onClick={() => { selectResource("Expense", selectedResource?.selectedResource === expense ? undefined : expense) }} expense={expense} />)}
            </Grid>
        </Stack>
    )


}

export default ExpenseCardList