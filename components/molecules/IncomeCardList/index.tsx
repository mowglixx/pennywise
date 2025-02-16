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
    return (
        <Suspense fallback={<Spinner size={'xl'} />}>
            {/* {incomes?.length < 1 ? (
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
                </EmptyState.Root>) : ( */}

            <Stack direction={{ base: 'row', md: 'column' }} gapX={'5'}>
                {incomes.map(({ id, source, amount, tags, receivedAt }: IncomeModel) => {
                    return <IncomeCard key={id} count={incomes.length} source={source} receivedAt={receivedAt} amount={amount} tags={tags} />
                })}

            </Stack>
            {/* )} */}
        </Suspense>)


}

export default IncomeCardList