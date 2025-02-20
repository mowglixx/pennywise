"use client"

import { Card, Heading, HStack, Stack, Tag, Text, VisuallyHidden } from '@chakra-ui/react'
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
        <Card.Root as={'li'} onClick={onClick && !hideControls ? onClick : () => { }} variant={'subtle'} aria-labelledby='IncomeCardTitle' cursor="pointer">
            <Card.Header>
                <HStack justifyContent={'space-between'}>
                    <Text fontSize={'xl'} id='IncomeCardTitle'>
                        {income.source}{income.description && ` - ${income.description}`} <VisuallyHidden>Income</VisuallyHidden>
                    </Text>
                    {
                        !hideControls &&
                        <Checkbox checked={selectedResource.selectedResource.id === income.id} />

                    }
                </HStack>
                <Text fontWeight={'bold'} fontSize={'xl'}><sup>£</sup> {new Prisma.Decimal(Number(income.amount)).toFixed(2)}</Text>
            </Card.Header>
            <Card.Body>
                <Stack>

                    <Stack justifyContent={{ base: 'space-between', smDown: 'column' }} direction={{ base: 'row', smDown: 'column' }}>
                        <Stack justifyContent={'end'}>
                            <Text title={nextPayday.toDateString()}>
                                Due {relativeDateFormatter(nextPayday)}
                            </Text>
                            <Text fontSize={'sm'} fontVariant={'all-small-caps'}>
                                {income.frequency}
                            </Text>
                        </Stack>
                        <HStack maxW={'50%'} flexWrap={'wrap'} justifyContent={'end'}>
                            {Array.isArray(income?.tags) && income.tags.map((tag, i) => (
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

export default IncomeCard