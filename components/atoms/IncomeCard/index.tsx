"use client"

import { Card, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { calculateNextPayday } from '@/lib/helpers/calcDates'
import relativeDateFormatter from '@/lib/helpers/relativeDateFormatter'
import { Prisma } from '@prisma/client'
import { useActionDrawer } from '@/components/contexts/ActionDrawerContext'
import { Checkbox } from "@/components/ui/checkbox"

export interface IncomeCardProps {
    income: Prisma.IncomeCreateWithoutUserInput
    hideControls?: boolean
    onClick?(): void
}

const IncomeCard = ({ income, hideControls, onClick }: IncomeCardProps) => {

    const nextPayday = calculateNextPayday({ startDate: income.receivedAt, interval: income.frequency }, new Date())
    const { selectedResource } = useActionDrawer()

    return (
        <Card.Root as={'li'} minW={'100%'} width={'100%'} onClick={onClick && !hideControls ? onClick : () => { }}>
            <Card.Header>
                <Stack justifyContent={'space-between'} direction={{ base: 'row', mdDown: 'column' }}>
                    <Stack truncate>
                        <Heading>
                            {income.source}
                        </Heading>
                    </Stack>
                    {!hideControls && <HStack>
                        <Checkbox checked={selectedResource.selectedResource === income} />
                    </HStack>}
                </Stack>
            </Card.Header>
            <Card.Body>
                <Stack>

                    <Stack direction='row' justifyContent={'space-between'}>
                        <Text fontVariant={'all-small-caps'}>{income.frequency}</Text>
                    </Stack>

                    <Stack direction='row' justifyContent={'space-between'}>
                        <Text title={nextPayday.toDateString()}>
                            {relativeDateFormatter(nextPayday)}
                        </Text>
                        <Text fontStyle={'italic'}>£{new Prisma.Decimal(Number(income.amount)).toFixed(2)}</Text>
                    </Stack>

                    <Stack direction='row'>
                        {Array.isArray(income?.tags) && income.tags.map((tag, i) => (
                            <Tag.Root key={i}>
                                <Tag.Label>
                                    {tag}
                                </Tag.Label>
                            </Tag.Root>
                        ))}
                    </Stack>
                </Stack>
            </Card.Body>
        </Card.Root>)
}

export default IncomeCard