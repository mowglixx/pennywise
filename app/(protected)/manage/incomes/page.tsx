"use client"

import { Card, Stack, Tag, EmptyState, Button, ActionBarSeparator, ActionBarSelectionTrigger, ActionBarContent, ActionBarRoot, Heading, HStack, Text } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"

// local imports
import { CreateIncomeForm } from "@/components/molecules/Forms/Income"
import { IncomeModel } from "@/infrastructure/prismaRepository"
import { Prisma } from "@prisma/client"
import { LuBanknote, LuPlus } from "react-icons/lu"

import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

function Page() {
    const [incomes, setIncomes] = useState([])
    const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)

    const fetchIncomes = () => {
        fetch('/api/money/income')
            .then(res => res.json())
            .then(json => setIncomes(json))
    }

    useEffect(fetchIncomes, [])

    // runs as part of the form submission
    const addIncomeSubmitHook = () => {
        // close the create income form drawer
        setShowCreateIncomeForm(false)
        // fetch the new incomes
        fetchIncomes()
    }

    return (
        <Stack direction={{ base: 'column' }} gap={5} >
            <Stack direction={{ base: 'row' }} gap='5' overflowX={'scroll'}>
                {<IncomeCardList incomes={incomes} setDrawerState={setShowCreateIncomeForm} />}
            </Stack>
            <Stack as={'div'}>

                <Heading as="h2">
                    Incomes
                </Heading>

                <Button onClick={() => setShowCreateIncomeForm(true)}>
                    <HStack>
                        <LuPlus />
                        <Text>
                            Add Income
                        </Text>
                    </HStack>
                </Button>

            </Stack>



            <DrawerRoot open={showCreateIncomeForm} placement={{ smDown: 'bottom', md: 'end' }} size={{ smDown: 'sm', md: 'md' }} >
                <DrawerBackdrop />
                <DrawerTrigger />
                <DrawerContent offset={{ smDown: '10' }}>
                    <DrawerCloseTrigger onClick={() => setShowCreateIncomeForm(false)} />
                    <DrawerHeader>
                        <DrawerTitle>
                            Add an income
                        </DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <CreateIncomeForm submitTrigger={addIncomeSubmitHook} />
                    </DrawerBody>
                    <DrawerFooter />
                </DrawerContent>
            </DrawerRoot>


        </Stack>
    )
}

export default Page

interface IncomeCardListProps {
    incomes: IncomeModel[] | never[] | [],
    setDrawerState: React.Dispatch<React.SetStateAction<boolean>>;

}

function IncomeCardList({ incomes, setDrawerState }: IncomeCardListProps) {
    return <>
        {incomes?.length ?
            // if there are incomes, show a list of the incomes
            incomes.map(({ id, source, amount, tags, receivedAt }: IncomeModel, _, arr) => <IncomeCard key={id} count={arr.length} source={source} receivedAt={receivedAt} amount={amount} tags={tags} />) : (
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
                </EmptyState.Root>)}
    </>
}

interface IncomeCardProps {
    count: number,
    source: string,
    receivedAt: Date,
    amount: string | number,
    tags: string[] | undefined
}

function IncomeCard({ count, source, receivedAt, amount, tags }: IncomeCardProps) {
    return <Card.Root minW={{ base: count > 1 ? '80%' : '100%', md: '300px' }}>
        <Card.Header as='h3'>
            {source}
        </Card.Header>
        <Card.Body>
            <Stack>

                <Stack direction='row'>
                    <p>{new Date(receivedAt).toLocaleDateString()}</p>
                    <p>£{new Prisma.Decimal(amount).toFixed(2)}</p>
                </Stack>

                <Stack direction='row'>
                    {tags?.length ?
                        // if there are tags, show a list of the tags
                        <>
                            {tags.map((tag, i) => (
                                <Tag.Root key={i}>
                                    <Tag.Label>
                                        {tag}
                                    </Tag.Label>
                                </Tag.Root>
                            ))}
                        </>
                        // if there are no tags, show an "Untagged" tag
                        : (<Tag.Root>
                            <Tag.Label>
                                Untagged
                            </Tag.Label>
                        </Tag.Root>)}
                </Stack>
            </Stack>
        </Card.Body>
    </Card.Root>
}

