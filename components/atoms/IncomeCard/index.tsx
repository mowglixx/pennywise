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
        <Card.Root as={'li'} minW={'100%'} width={'100%'} onClick={onClick && !hideControls ? onClick : () => { }} variant={'subtle'}>
            <Card.Header>
                <HStack justifyContent={'space-between'}>
                    <Text fontSize={'xl'}>
                        {income.source}{income.description && ` - ${income.description}`}
                    </Text>
                    <Checkbox checked={selectedResource.selectedResource === income} />
                </HStack>
                <Text fontWeight={'bold'} fontSize={'xl'}><sup>£</sup> {new Prisma.Decimal(Number(income.amount)).toFixed(2)}</Text>
            </Card.Header>
            <Card.Body>
                <Stack>

                    <Stack justifyContent={'space-between'} direction={{ base: 'row', smDown: 'column' }}>
                        <Stack>
                            <Text title={nextPayday.toDateString()}>
                                Due {relativeDateFormatter(nextPayday)}
                            </Text>
                        </Stack>
                        <Text fontSize={'sm'} fontVariant={'all-small-caps'}>
                            {income.frequency}
                        </Text>
                        <Stack>
                            <HStack>
                                {Array.isArray(income?.tags) && income.tags.map((tag, i) => (
                                    <Tag.Root size={'lg'} key={i} maxW={'100px'}>
                                        <Tag.Label>
                                            {tag}
                                        </Tag.Label>
                                    </Tag.Root>
                                ))}
                            </HStack>
                        </Stack>
                    </Stack>
                </Stack>
            </Card.Body>
        </Card.Root>)
}

export default IncomeCard