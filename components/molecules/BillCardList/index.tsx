"use client"
import { prisma } from "@/prisma";
import { Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import BillCard from "@/components/atoms/BillCard";
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import { Prisma } from "@prisma/client";


export interface BillCardListProps {
    bills: Prisma.BillCreateWithoutUserInput[],
}

const BillCardList = ({ bills }: BillCardListProps) => {

    const { selectedResource, selectResource } = useActionDrawer()



    if (bills?.length < 1) return null


    return (
        <Stack>
            <Heading>Bill List</Heading>
            <Grid as={'ul'} gap={'5'} templateColumns={"1fr"}>
                {bills.map((bill) => <BillCard key={bill.id} onClick={() => { selectResource("Bill", selectedResource?.selectedResource === bill ? undefined : bill) }} bill={bill} />)}
            </Grid>
        </Stack>
    )


}

export default BillCardList