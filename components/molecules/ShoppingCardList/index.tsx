"use client"
import { prisma } from "@/prisma";
import { Grid, GridItem, Heading, Stack } from "@chakra-ui/react";
import ShoppingCard from "@/components/atoms/ShoppingCard";
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import { Prisma } from "@prisma/client";


export interface ShoppingCardListProps {
    shopping: Prisma.ShoppingCreateWithoutUserInput[],
}

const ShoppingCardList = ({ shopping }: ShoppingCardListProps) => {

    const { selectedResource, selectResource } = useActionDrawer()



    if (shopping?.length < 1) return null


    return (
        <Stack>
            <Heading>Shopping List</Heading>
            <Grid as={'ul'} gap={'5'} templateColumns={"1fr"}>
                {shopping.map((shopping) => <ShoppingCard key={shopping.id} onClick={() => { selectResource("Shopping", selectedResource?.selectedResource === shopping ? undefined : shopping) }} shopping={shopping} />)}
            </Grid>
        </Stack>
    )


}

export default ShoppingCardList