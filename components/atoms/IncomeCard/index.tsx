"use client"

import { IncomeModel } from '@/lib/infrastructure/prismaRepository'
import { Card, Stack, Tag, Text } from '@chakra-ui/react'
import { calculateNextPayday } from '@/lib/helpers/calcDates'
import relativeDateFormatter from '@/lib/helpers/relativeDateFormatter'
import { useState } from 'react'
import { Prisma } from '@prisma/client'

export interface IncomeCardProps {
    income: IncomeModel

}

const IncomeCard = ({ income }: IncomeCardProps) => {

    const nextPayday = calculateNextPayday({ startDate: income.receivedAt, interval: income.frequency }, new Date())

    return (
        <Card.Root as={'li'}
            width={{ base: "100%", smDown: '90vw' }}
            h={'100%'}
        >
            <Card.Header>
                {income.source}
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