"use client"

import { Card, Stack, Tag, EmptyState, Button, ActionBarSeparator, ActionBarSelectionTrigger, ActionBarContent, ActionBarRoot } from "@chakra-ui/react"
import { useState, useEffect } from "react"

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
    const [incomeTrigger, setIncomeTrigger] = useState(1)
    const [incomes, setIncomes] = useState([])
    const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)


    const fetchIncomes = () => {
        fetch('/api/money/income')
            .then(res => res.json())
            .then(json => setIncomes(json))
    }

    useEffect(fetchIncomes, [])

    return (
        <Stack direction={{ base: 'column' }} gap={5} >
            <Stack direction={{ base: 'row' }} p='5' gap='5' overflowX={'scroll'}>
                {incomes?.length ?
                    incomes.map(({ id, source, amount, tags, receivedAt }: IncomeModel) => {
                    return (
                        <Card.Root key={id} minW={'200px'}>
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
                                            <>
                                                {
                                                    tags.map((tag, i) => (
                                                        <Tag.Root key={i}>
                                                            < Tag.Label>
                                                                {tag}
                                                            </Tag.Label>
                                                        </Tag.Root>
                                                    ))
                                                }
                                            </>
                                            : (<Tag.Root>
                                                < Tag.Label>
                                                    Untagged
                                                </Tag.Label>
                                            </Tag.Root>)
                                        }
                                    </Stack>
                                </Stack>
                            </Card.Body>
                        </Card.Root>
                    )
                })
                    : (<EmptyState.Root>
                        <EmptyState.Content>
                            <EmptyState.Indicator>
                                <LuBanknote />
                            </EmptyState.Indicator>
                            <EmptyState.Title>
                                No Incomes Found
                            </EmptyState.Title>
                            <EmptyState.Description>
                                <Button onClick={() => setShowCreateIncomeForm(true)}>
                                    <LuPlus /> Add Income
                                </Button>
                            </EmptyState.Description>
                        </EmptyState.Content>
                    </EmptyState.Root>)}
            </Stack>
            <Card.Root as={'div'}>

                <Card.Header as="h2">
                    Incomes
                </Card.Header>
                <Card.Body>

                </Card.Body>
            </Card.Root>



            <DrawerRoot open={showCreateIncomeForm}>
                <DrawerBackdrop />
                <DrawerTrigger />
                <DrawerContent>
                    <DrawerCloseTrigger onClick={() => setShowCreateIncomeForm(false)} />
                    <DrawerHeader>
                        <DrawerTitle />
                    </DrawerHeader>
                    <DrawerBody>
                        <CreateIncomeForm submitState={incomeTrigger} submitTrigger={setIncomeTrigger} />
                    </DrawerBody>
                    <DrawerFooter />
                </DrawerContent>
            </DrawerRoot>


        </Stack>
    )
}

export default Page