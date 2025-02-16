import { Card, Stack, Tag } from '@chakra-ui/react'
import { Prisma } from '@prisma/client'


export interface IncomeCardProps {
    count: number,
    source: string,
    receivedAt: Date,
    amount: string | number,
    tags: string[] | undefined
}

const IncomeCard = ({ count, source, receivedAt, amount, tags }: IncomeCardProps) => {
    return <Card.Root minW={{ base: count > 1 ? '300px' : '90vw', md: '300px' }}>
        <Card.Header as='h3'>
            {source}
        </Card.Header>
        <Card.Body>
            <Stack>

                <Stack direction='row' justifyContent={'space-between'}>
                    <p>{new Date(receivedAt).toLocaleDateString()}</p>
                    <p>£{new Prisma.Decimal(amount).toFixed(2)}</p>
                </Stack>

                <Stack direction='row'>
                    {tags?.length ?
                        // if there are tags, show a list of the tags
                        <>
                            {tags.map((tag, i) => (
                                <Tag.Root key={i}>
                                    <Tag.Label>
                                        {tag}
                                    </Tag.Label>
                                </Tag.Root>
                            ))}
                        </>
                        // if there are no tags, show an "Untagged" tag
                        : (<Tag.Root>
                            <Tag.Label>
                                Untagged
                            </Tag.Label>
                        </Tag.Root>)}
                </Stack>
            </Stack>
        </Card.Body>
    </Card.Root>
}

export default IncomeCard