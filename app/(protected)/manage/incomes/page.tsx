"use client"

import { Card, Stack, Tag } from "@chakra-ui/react"
import { Prisma } from "@prisma/client"
import { useState, useEffect } from "react"

// local imports
import { CreateIncomeForm } from "@/components/molecules/Forms/Income"
import { IncomeModel } from "@/infrastructure/prismaRepository"

function Page() {
    const [incomeTrigger, setIncomeTrigger] = useState(1)
    const [incomes, setIncomes] = useState([])

    useEffect(() => {
        fetch('/api/money/income')
            .then(res => res.json())
            .then(json => setIncomes(json))
    }, [incomeTrigger, setIncomes])

    return (
        <>
            <Stack direction={{ base: 'row', md: 'row' }} p='5' gap='5' overflowX={'scroll'}>
                {incomes?.length ? incomes.map(({ id, source, amount, tags, receivedAt }: IncomeModel) => {
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
                    : <pre>{JSON.stringify(incomes, null, 2)}</pre>}
            </Stack>
            <Card.Root as={'div'}>
                <Card.Header as="h2">
                    Incomes
                </Card.Header>
                <Card.Body>

                    <section>
                        <CreateIncomeForm submitState={incomeTrigger} submitTrigger={setIncomeTrigger} />

                    </section>

                </Card.Body>
            </Card.Root>
        </>
    )
}

export default Page