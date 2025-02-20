"use client"

import { Stack, Button, Heading, HStack, Text, DataList, VisuallyHidden, Grid, GridItem, EmptyState } from "@chakra-ui/react"
import { useContext, useMemo } from "react"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

// local imports
import ShoppingCardList from "@/components/molecules/ShoppingCardList"

// Chakra UI Local Imports
import { LuPencil, LuPlus, LuTrash } from "react-icons/lu"
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import {
    ActionBarContent,
    ActionBarRoot,
    ActionBarSeparator,
} from "@/components/ui/action-bar"
import { Prisma } from "@prisma/client";

function ShoppingPage() {

    const { userData } = useContext(UserDataContext)
    const { selectedResource, setActionForm } = useActionDrawer()

    const shopping = useMemo(() => {
        return userData.shopping
    }, [userData.shopping])


    if (shopping.length < 1) {
        return (<EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    {/* <LuClipboardPen /> */}
                    😨
                </EmptyState.Indicator>
                <EmptyState.Title>
                    You have no shopping budget, how will you eat? 
                </EmptyState.Title>
                <EmptyState.Description>

                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Shopping", "create", undefined)
                    }} aria-labelledby="AddShoppingFormButton">
                        <LuPlus />
                        <Text id="AddShoppingFormButton">
                            Add a Shopping Budget
                        </Text>
                    </Button>
                </EmptyState.Description>
            </EmptyState.Content>
        </EmptyState.Root>)
    }

    return (
        <>
            <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={5} pb={'20'}>

                <GridItem order={{ mdDown: 0 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <Heading>
                        Summary
                    </Heading>
                    <Stack>

                        {shopping?.length && shopping?.map && (
                            <>
                                <Stack direction={{ base: 'column' }}>
                                    <Stack py={'5'}>
                                        <Chart
                                            type="doughnut"
                                            data={{
                                                labels: [...shopping.map((shopping: Prisma.ShoppingCreateWithoutUserInput) => shopping.description)],
                                                datasets: [{
                                                    label: 'Shopping Budget',
                                                    data: [...shopping.map((shopping: Prisma.ShoppingCreateWithoutUserInput) => Number(shopping.amount).toFixed(2))],
                                                }]
                                            }}
                                            options={{
                                                responsive: true,
                                            }}
                                        />
                                    </Stack>
                                    <DataList.Root variant={'bold'} orientation="horizontal" justifyContent={'center'}>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Shopping Budgets</DataList.ItemLabel>
                                            <DataList.ItemValue>{shopping.length}</DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Top Shopping Budget</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                {`${shopping.sort(
                                                    (a, b) => Number(a.amount) - Number(b.amount))?.[0].source} - ${shopping.sort((a, b) => Number(a.amount) - Number(b.amount))?.[0].description}`}
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Total Shopping Budget</DataList.ItemLabel>
                                            <DataList.ItemValue>£ {shopping.reduce((prev, current) => { return prev + Number(current.amount) }, 0).toFixed(2)}</DataList.ItemValue>
                                        </DataList.Item>
                                    </DataList.Root>
                                </Stack>
                            </>
                        )
                        }
                    </Stack>

                </GridItem>
                <GridItem order={{ mdDown: 1 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <ShoppingCardList shopping={userData.shopping} />
                </GridItem>
            </Grid>
            <ActionBarRoot open={true}>
                <ActionBarContent>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Shopping", "delete", selectedResource.selectedResource)
                    }} aria-labelledby="DeleteShoppingFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuTrash />
                            <VisuallyHidden id="DeleteShoppingFormButton">
                                Delete Shopping
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Shopping", "update", selectedResource.selectedResource)
                    }} aria-labelledby="EditShoppingFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuPencil />
                            <VisuallyHidden id="EditShoppingFormButton">
                                Edit Shopping
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <ActionBarSeparator />
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Shopping", "create", undefined)
                    }} aria-labelledby="AddShoppingFormButton">
                        <HStack>
                            <LuPlus />
                            <VisuallyHidden id="AddShoppingFormButton">
                                Add Shopping
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                </ActionBarContent>
            </ActionBarRoot>
        </>
    )
}

export default ShoppingPage



