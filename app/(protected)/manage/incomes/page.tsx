"use client"

import { Card, Spinner, Stack, Tag } from "@chakra-ui/react"
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
            <Stack direction='row' p='5'>
                {incomes?.length ? incomes.map(({ id, source, amount, tags, receivedAt }: IncomeModel) => {
                    return (
                        <Card.Root key={id}>
                            <Card.Header as='h3'>
                                {source}
                            </Card.Header>
                            <Card.Body>
                                <Stack>

                                    <Stack direction='row'>
                                        <p>{new Date(receivedAt).toLocaleDateString()}</p>
                                        <p>£{new Prisma.Decimal(amount).toFixed(2)}</p>
                                    </Stack>
                                    <Spinner>

                                        <Stack direction='row'>
                                            {tags?.length &&
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
                                            }
                                        </Stack>
                                    </Spinner>
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