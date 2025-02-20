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
            <Grid as={'ul'} gap={'5'} p={'5'} templateColumns={{ base: "1fr", md: "1fr 1fr" }} borderBottom={'1px solid fg.100'}>
                {incomes.map((income, i) => {
                return (
                    <GridItem key={income.id} colSpan={{ base: i === 0 ? 2 : 1, smDown: 1 }} rowSpan={1}>
                        <IncomeCard onClick={() => { selectResource("Income", selectedResource?.selectedResource === income ? undefined : income) }} income={income} />
                    </GridItem>
                )
            })}
        </Grid>
        </Stack>
    )


}

export default IncomeCardList