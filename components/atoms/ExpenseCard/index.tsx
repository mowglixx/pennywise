"use client"

import { Card, Heading, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { calculateNextPayday } from '@/lib/helpers/calcDates'
import relativeDateFormatter from '@/lib/helpers/relativeDateFormatter'
import { Prisma } from '@prisma/client'
import { useActionDrawer } from '@/components/contexts/ActionDrawerContext'
import { Checkbox } from "@/components/ui/checkbox"

export interface ExpenseCardProps {
    expense: Prisma.ExpenseCreateWithoutUserInput
    hideControls?: boolean
    onClick?(): void
}

const ExpenseCard = ({ expense, hideControls, onClick }: ExpenseCardProps) => {

    const nextPayday = calculateNextPayday({ startDate: expense.dueDate, interval: expense.frequency }, new Date())
    const { selectedResource } = useActionDrawer()

    return (
        <Card.Root as={'li'} minW={'100%'} width={'100%'} onClick={onClick && !hideControls ? onClick : () => { }} variant={'subtle'}>
            <Card.Header>
                <HStack justifyContent={'space-between'}>
                    <Text fontSize={'xl'}>
                        {expense.source}{expense.description && ` - ${expense.description}`}
                    </Text>
                    {
                        !hideControls &&
                        <Checkbox checked={selectedResource.selectedResource === expense} />
                    }
                </HStack>
                <Text fontWeight={'bold'} fontSize={'xl'}><sup>£</sup> {new Prisma.Decimal(Number(expense.amount)).toFixed(2)}</Text>
            </Card.Header>
            <Card.Body>
                <Stack>

                    <Stack justifyContent={'space-between'} direction={{ base: 'row', smDown: 'column' }}>
                        <Stack justifyContent={'end'}>
                            <Text title={nextPayday.toDateString()}>
                                Due {relativeDateFormatter(nextPayday)}
                            </Text>
                            <Text fontSize={'sm'} fontVariant={'all-small-caps'}>
                                {expense.frequency}
                            </Text>
                        </Stack>
                        <HStack maxW={'50%'} flexWrap={'wrap'} justifyContent={'end'}>
                            {Array.isArray(expense?.tags) && expense.tags.map((tag, i) => (
                                <Tag.Root size={'lg'} key={i} maxW={'200px'}>
                                    <Tag.Label>
                                        {tag}
                                    </Tag.Label>
                                </Tag.Root>
                            ))}
                        </HStack>
                    </Stack>
                </Stack>
            </Card.Body>
        </Card.Root>)
}

export default ExpenseCard