"use client"

import { Stack, Button, Heading, HStack, Text, DataList, Separator } from "@chakra-ui/react"
import { useState, useEffect, useContext } from "react"
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

// local imports
import { CreateIncomeForm } from "@/components/molecules/Forms/Income"
import IncomeCardList from "@/components/molecules/IncomeCardList"

// Chakra UI Local Imports
import { LuPlus } from "react-icons/lu"
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { IncomeModel } from "@/infrastructure/prismaRepository";
import { relative } from "path";



function IncomesPage() {
    const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)

    const { userData, update } = useContext(UserDataContext)


    // runs as part of the form submission
    const addIncomeSubmitHook = () => {
        // close the create income form drawer
        setShowCreateIncomeForm(false)
        // fetch the new incomes
        update()
    }

    return (
        <>
            <DrawerRoot open={showCreateIncomeForm} placement={{ smDown: 'bottom', md: 'end' }} size={{ smDown: 'sm', md: 'md' }} >
                <DrawerBackdrop />
                <DrawerTrigger />
                <DrawerContent offset={{ smDown: '10' }}>
                    <DrawerCloseTrigger onClick={() => setShowCreateIncomeForm(false)} />
                    <DrawerHeader>
                        <DrawerTitle>
                            Add an income
                        </DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        {/* Submit hook allows for page refresh after submit */}
                        <CreateIncomeForm submitTrigger={addIncomeSubmitHook} />
                    </DrawerBody>
                    <DrawerFooter />
                </DrawerContent>
            </DrawerRoot>


            <Stack position={'relative'} direction={{ base: 'column', md: 'row' }} gap={5} >

                <Stack position={'relative'} direction={{ base: 'row', md: 'column' }} gap='5' overflowX={{ smDown: 'scroll' }}>
                    {<IncomeCardList incomes={userData.incomes} setDrawerState={setShowCreateIncomeForm} />}
                </Stack>

                <Stack position={'sticky'} as={'section'} direction={{ base: 'column' }} aria-labelledby="incomeSummaryHeading" minH={'100vh'}>
                    <Heading as="h2" id="incomeSummaryHeading">
                        Income Summary
                    </Heading>
                    <Stack>

                        {userData.incomes?.map && (
                            <Stack direction={{ base: 'column', md: 'row' }}>
                                <Stack py={'5'}>
                                    <Pie
                                        data={{
                                            labels: [...userData.incomes.map((income: IncomeModel) => income.source)],
                                            datasets: [{
                                                label: 'Income',
                                                data: userData.incomes.map((income: IncomeModel) => Number(income.amount).toFixed(2)),
                                            }]
                                        }}
                                    />
                                </Stack>
                                <Separator />
                                <DataList.Root variant={'bold'} orientation="horizontal">
                                    <DataList.Item>
                                        <DataList.ItemLabel>Incomes Sources</DataList.ItemLabel>
                                        <DataList.ItemValue>{userData.incomes.length}</DataList.ItemValue>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.ItemLabel>Total Income</DataList.ItemLabel>
                                        <DataList.ItemValue>£{userData.incomes.reduce((prev, current) => { return prev + Number(current.amount) }, 0).toFixed(2)}</DataList.ItemValue>
                                    </DataList.Item>
                                </DataList.Root>
                            </Stack>
                        )
                        }


                        <Button justifySelf={'end'} onClick={() => setShowCreateIncomeForm(true)} aria-labelledby="AddIncomeFormButton">
                            <HStack>
                                <LuPlus />
                                <Text id="AddIncomeFormButton">
                                    Add Income
                                </Text>
                            </HStack>
                        </Button>
                    </Stack>

                </Stack>



            </Stack>
        </>
    )
}

export default IncomesPage



