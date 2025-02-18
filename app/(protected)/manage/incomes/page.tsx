"use client"

import { Stack, Button, Heading, HStack, Text, Separator, DataList } from "@chakra-ui/react"
import { useContext } from "react"
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

// local imports
// import { CreateIncomeForm, UpdateIncomeForm } from "@/components/molecules/Forms/Income"
import IncomeCardList from "@/components/molecules/IncomeCardList"

// Chakra UI Local Imports
import { LuPlus } from "react-icons/lu"
import { UserDataContext } from "@/components/contexts/UserDataProvider"
import { IncomeModel } from "@/lib/infrastructure/prismaRepository";
import { useActionDrawer } from "@/components/contexts/ActionDrawerContext";



function IncomesPage() {

    const { userData } = useContext(UserDataContext)
    const { setActionForm } = useActionDrawer()


    return (
        <>
            <Stack position={'relative'} direction={{ base: 'column-reverse', md: 'row' }} gap={5}>

                <Stack mb={0} position={'relative'} direction={{ base: 'row', md: 'column' }} gap='5' overflowX={{ smDown: 'scroll' }}>
                    {Array.isArray(userData?.incomes) && <IncomeCardList incomes={userData.incomes} />}
                    {/* <pre>
                        {JSON.stringify(userData, null, 2)}
                    </pre> */}
                </Stack>
                <Separator mt={-5} />

                <Stack position={'sticky'} as={'section'} direction={{ base: 'column' }} aria-labelledby="incomeSummaryHeading">
                    <Heading as="h2" id="incomeSummaryHeading">
                        Income Summary
                    </Heading>
                    <Stack direction={{ base: 'column-reverse', md: 'column' }}>

                        {userData.incomes?.length && userData.incomes?.map && (
                            <>
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
                                </Stack>
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
                            </>
                        )
                        }


                        <Button justifySelf={'end'} onClick={() => {
                            setActionForm("income", "create", undefined)
                        }} aria-labelledby="AddIncomeFormButton">
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



