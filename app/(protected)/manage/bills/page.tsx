"use client"

import { Stack, Button, Heading, HStack, Text, DataList, VisuallyHidden, Grid, GridItem, EmptyState } from "@chakra-ui/react"
import { useContext, useMemo } from "react"
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

// local imports
import BillCardList from "@/components/molecules/BillCardList"

// Chakra UI Local Imports
import { LuClipboardPen, LuPencil, LuPlus, LuTrash } from "react-icons/lu"
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";
import {
    ActionBarContent,
    ActionBarRoot,
    ActionBarSeparator,
} from "@/components/ui/action-bar"
import { Prisma } from "@prisma/client";

function BillsPage() {

    const { userData } = useContext(UserDataContext)
    const { selectedResource, setActionForm } = useActionDrawer()

    const bills = useMemo(() => {
        return userData.bills
    }, [userData.bills])


    if (bills.length < 1) {
        return (<EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <LuClipboardPen />
                </EmptyState.Indicator>
                <EmptyState.Title>
                    You have no Bills, lucky you!
                </EmptyState.Title>
                <EmptyState.Description>

                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Bill", "create", undefined)
                    }} aria-labelledby="AddBillFormButton">
                        <LuPlus />
                        <Text id="AddBillFormButton">
                            Add an Bill
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

                        {bills?.length && bills?.map && (
                            <>
                                <Stack direction={{ base: 'column' }}>
                                    <Stack py={'5'}>
                                        <Chart
                                            type="doughnut"
                                            data={{
                                                labels: [...bills.map((bill: Prisma.BillCreateWithoutUserInput) => bill.description)],
                                                datasets: [{
                                                    label: 'Bill',
                                                    data: [...bills.map((bill: Prisma.BillCreateWithoutUserInput) => Number(bill.amount).toFixed(2))],
                                                }]
                                            }}
                                            options={{
                                                responsive: true,
                                            }}
                                        />
                                    </Stack>
                                    <DataList.Root variant={'bold'} orientation="horizontal" justifyContent={'center'}>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Bill Sources</DataList.ItemLabel>
                                            <DataList.ItemValue>{bills.length}</DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Top Bill</DataList.ItemLabel>
                                            <DataList.ItemValue>
                                                {`${bills.sort(
                                                    (a, b) => Number(a.amount) - Number(b.amount))?.[0].source} - ${bills.sort((a, b) => Number(a.amount) - Number(b.amount))?.[0].description}`}
                                            </DataList.ItemValue>
                                        </DataList.Item>
                                        <DataList.Item>
                                            <DataList.ItemLabel>Total Bills</DataList.ItemLabel>
                                            <DataList.ItemValue>£ {bills.reduce((prev, current) => { return prev + Number(current.amount) }, 0).toFixed(2)}</DataList.ItemValue>
                                        </DataList.Item>
                                    </DataList.Root>
                                </Stack>
                            </>
                        )
                        }
                    </Stack>

                </GridItem>
                <GridItem order={{ mdDown: 1 }} position={'sticky'} as={'section'} direction={{ base: 'column' }}>
                    <BillCardList bills={userData.bills} />
                </GridItem>
            </Grid>
            <ActionBarRoot open={true}>
                <ActionBarContent>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Bill", "delete", selectedResource.selectedResource)
                    }} aria-labelledby="DeleteBillFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuTrash />
                            <VisuallyHidden id="DeleteBillFormButton">
                                Delete Bill
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Bill", "update", selectedResource.selectedResource)
                    }} aria-labelledby="EditBillFormButton" disabled={!selectedResource.selectedResource}>
                        <HStack>
                            <LuPencil />
                            <VisuallyHidden id="EditBillFormButton">
                                Edit Bill
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                    <ActionBarSeparator />
                    <Button justifySelf={'end'} onClick={() => {
                        setActionForm("Bill", "create", undefined)
                    }} aria-labelledby="AddBillFormButton">
                        <HStack>
                            <LuPlus />
                            <VisuallyHidden id="AddBillFormButton">
                                Add Bill
                            </VisuallyHidden>
                        </HStack>
                    </Button>
                </ActionBarContent>
            </ActionBarRoot>
        </>
    )
}

export default BillsPage



