"use client"
import { prisma } from "@/prisma";
import { Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import IncomeCard from "@/components/atoms/IncomeCard";
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import { Prisma } from "@prisma/client";


export interface IncomeCardListProps {
    incomes: Prisma.IncomeCreateWithoutUserInput[],
}

const IncomeCardList = ({ incomes }: IncomeCardListProps) => {

    const { selectedResource, selectResource } = useActionDrawer()



    if (incomes?.length < 1) return null


    return (
        <Stack>
            <Heading>Income List</Heading>
            <Grid as={'ul'} gap={'5'} templateColumns={"1fr"}>
                {incomes.map((income, i) => <IncomeCard key={income.id} onClick={() => { selectResource("Income", selectedResource?.selectedResource === income ? undefined : income) }} income={income} />)}
        </Grid>
        </Stack>
    )


}

export default IncomeCardList