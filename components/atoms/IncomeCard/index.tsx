"use client"

import { IncomeModel } from '@/lib/infrastructure/prismaRepository'
import { Button, Card, HStack, Stack, Tag, Text } from '@chakra-ui/react'
import { calculateNextPayday } from '@/lib/helpers/calcDates'
import relativeDateFormatter from '@/lib/helpers/relativeDateFormatter'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
import { useActionDrawer } from '@/components/contexts/ActionDrawerContext'
import { LuPencil, LuTrash } from 'react-icons/lu'

export interface IncomeCardProps {
    income: IncomeModel
    hideControls?: boolean
}

const IncomeCard = ({ income, hideControls }: IncomeCardProps) => {

    const nextPayday = calculateNextPayday({ startDate: income.receivedAt, interval: income.frequency }, new Date())
    const { setActionForm } = useActionDrawer()

    return (
        <Card.Root as={'li'}>
            <Card.Header>
                <Stack justifyContent={'space-between'} direction={{ base: 'row', mdDown: 'column' }}>
                    <Stack truncate>
                        {income.source}
                    </Stack>
                    {!hideControls && <HStack>
                        <Button variant={'ghost'} onClick={() => setActionForm("income", "update", income)}><LuPencil /></Button>
                        <Button variant={'ghost'} onClick={() => setActionForm("income", "delete", income)}><LuTrash /></Button>
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
                        <Text fontStyle={'italic'}>£{new Prisma.Decimal(income.amount).toFixed(2)}</Text>
                    </Stack>

                    <Stack direction='row'>
                        {income?.tags?.map && income.tags.map((tag, i) => (
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