"use client"
import { IncomeModel } from "@/lib/infrastructure/prismaRepository";
import { Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import IncomeCard from "@/components/atoms/IncomeCard";


export interface IncomeCardListProps {
    incomes: IncomeModel[],
}

const IncomeCardList = ({ incomes }: IncomeCardListProps) => {

    if (incomes?.length < 1) return null

    return (
        <Stack>
            <Heading>Incomes</Heading>
            <Grid as={'ul'} gap={'5'} p={'5'} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", xlTo2xl: "repeat(3, 1fr)" }} borderBottom={'1px solid fg.100'}>
            {incomes.map((income: IncomeModel, i) => {
                return (
                    <GridItem key={income.id} colSpan={{ base: i === 0 ? 2 : 1, smDown: 1 }} rowSpan={1}>
                        <IncomeCard income={income} />
                    </GridItem>
                )
            })}
        </Grid>
        </Stack>
    )


}

export default IncomeCardList