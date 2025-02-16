import { IncomeModel } from "@/infrastructure/prismaRepository";
import { Button, EmptyState, Spinner, Stack } from "@chakra-ui/react";
import { LuBanknote, LuPlus } from "react-icons/lu";
import IncomeCard from "@/components/atoms/IncomeCard";
import { Suspense } from "react";


export interface IncomeCardListProps {
    incomes: IncomeModel[] | never[] | [],
    setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;

}

const IncomeCardList = ({ incomes, setDrawerState }: IncomeCardListProps) => {

    // if there are incomes, show a list of the incomes
    if (incomes?.length < 1) {
        return (
            // if there are no incomes show an empty state container
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                        <LuBanknote />
                    </EmptyState.Indicator>
                    <EmptyState.Title>
                        No Incomes Found
                    </EmptyState.Title>
                    <EmptyState.Description>
                        <Button onClick={() => setDrawerState(true)}>
                            <LuPlus /> Add Income
                        </Button>
                    </EmptyState.Description>
                </EmptyState.Content>
            </EmptyState.Root>)
    }
    return (<Stack direction={{ base: 'row', md: 'column' }}>
        {incomes.map(({ id, source, amount, tags, receivedAt }: IncomeModel, _, arr) => {
            return <IncomeCard key={id} count={arr.length} source={source} receivedAt={receivedAt} amount={amount} tags={tags} />
        })}
    </Stack>)


}

export default IncomeCardList