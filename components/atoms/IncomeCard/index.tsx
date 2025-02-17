import { UpdateIncomeForm } from '@/components/molecules/Forms/Income'
import { IncomeModel } from '@/lib/infrastructure/prismaRepository'
import toTitleCase from '@/lib/helpers/toTitleCase'
import relativeTimeFormatter from '@/lib/helpers/toTitleCase/realiveDateFormatter'
import { Card, Drawer, DrawerRoot, Stack, Tag, Text } from '@chakra-ui/react'
import { Prisma } from '@prisma/client'

export interface IncomeCardProps {
    index: number,
    income: IncomeModel

}

const IncomeCard = ({ index, income }: IncomeCardProps) => {

    return (
        <Card.Root as={'li'}
            width={{ base: "100%", smDown: '90vw' }}
            h={'100%'}
            variant={index > 0 ? "elevated" : "subtle"}
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
                        <Text>{relativeTimeFormatter(new Date(income.receivedAt))}</Text>
                        <Text>{new Date(income.receivedAt).toDateString()}</Text>
                        <Text fontStyle={'italic'}>£{new Prisma.Decimal(income.amount).toFixed(2)}</Text>
                    </Stack>

                    {
                        Array.isArray(income.tags) && income.tags?.length &&
                        <Stack direction='row'>
                                {income.tags.map((tag, i) => (
                                <Tag.Root key={i}>
                                    <Tag.Label>
                                        {tag}
                                    </Tag.Label>
                                </Tag.Root>
                                ))}
                            </Stack>
                    }
            </Stack>
        </Card.Body>
        </Card.Root>)
}

export default IncomeCard