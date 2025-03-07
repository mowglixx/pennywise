"use client"

import { Card, Heading, HStack, Stack, Tag, Text, VisuallyHidden } from '@chakra-ui/react'
import { calculateNextPayday } from '@/lib/helpers/calcDates'
import relativeDateFormatter from '@/lib/helpers/relativeDateFormatter'
import { useActionDrawer } from '@/components/contexts/ActionDrawerContext'
import { Prisma } from "@prisma/client";
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
                        <HStack justifyContent={'start'} alignItems={'start'}>
                <HStack justifyContent={'space-between'} flexGrow={1}>
                    <Stack direction={"column"}>
                        <Text fontSize={'xl'}>
                            {income.source}
                        </Text>
                        <Text id='IncomeCardTitle'>
                            {income.description && `${income.description}`} <VisuallyHidden>Income</VisuallyHidden>
                        </Text>
                    </Stack>
                    <Text fontWeight={'bold'} fontSize={'3xl'}>
                        <sup>£</sup> {new Prisma.Decimal(income.amount).toFixed(2)}
                    </Text>
                </HStack>
                </HStack>
            </Card.Header>
            <Card.Body>
                <HStack>
                    <Stack>

                    {
                        !hideControls &&
                        <Checkbox checked={selectedResource.selectedResource?.id === income.id} />

                    }
                    </Stack>

                    <Stack justifyContent={{ base: 'space-between', smDown: 'column' }} direction={{ base: 'row', smDown: 'column' }}>
                        <Stack justifyContent={'space-between'}>
                            <Text title={nextPayday.toDateString()}>
                                Due {relativeDateFormatter(nextPayday)}
                            </Text>
                            <HStack direction='row-reverse'>
                            <Text fontSize={'sm'} fontVariant={'all-small-caps'}>
                                {income.frequency}
                            </Text>
                            </HStack>
                        </Stack>
                        <HStack maxW={'50%'} flexWrap={'wrap'}>
                            {Array.isArray(income?.tags) && income.tags.map((tag: string, i: number) => (
                                <Tag.Root size={'lg'} key={i} maxW={'200px'}>
                                    <Tag.Label>
                                        {tag}
                                    </Tag.Label>
                                </Tag.Root>
                            ))}
                        </HStack>
                    </Stack>
                </HStack>
            </Card.Body>
        </Card.Root>)
}

export default IncomeCard