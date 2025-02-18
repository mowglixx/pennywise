"use client"
import { IncomeModel } from "@/lib/infrastructure/prismaRepository";
import { Button, EmptyState, Grid, GridItem, Spinner, Stack } from "@chakra-ui/react";
import { LuBanknote, LuPlus } from "react-icons/lu";
import IncomeCard from "@/components/atoms/IncomeCard";
import { Suspense } from "react";


export interface IncomeCardListProps {
    incomes: IncomeModel[],
}

const IncomeCardList = ({ incomes }: IncomeCardListProps) => {

    if (incomes?.length < 1) return null

    return (
        <Grid h={'40vh'} as={'ul'} gap={'5'} templateColumns={{ smDown: "repeat(1, 1fr)", base: "repeat(2, 1fr)" }} borderBottom={'1px solid fg.100'}>
            {incomes.map((income: IncomeModel, i) => {
                return (
                    <GridItem key={income.id} colSpan={{ base: i === 0 ? 2 : 1, smDown: 1 }} rowSpan={1}>
                        <IncomeCard income={income} />
                    </GridItem>
                )
            })}
        </Grid>
    )


}

export default IncomeCardList