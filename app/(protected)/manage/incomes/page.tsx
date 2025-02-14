"use client"

import { Card, Stack, Tag, EmptyState, Button, ActionBarSeparator, ActionBarSelectionTrigger, ActionBarContent, ActionBarRoot, Heading, HStack, Text } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"

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



function IncomesPage() {
    const [incomes, setIncomes] = useState([])
    const [showCreateIncomeForm, setShowCreateIncomeForm] = useState(false)

    const fetchIncomes = () => {
        fetch('/api/money/income')
            .then(res => res.json())
            .then(json => setIncomes(json))
    }

    useEffect(fetchIncomes, [])

    // runs as part of the form submission
    const addIncomeSubmitHook = () => {
        // close the create income form drawer
        setShowCreateIncomeForm(false)
        // fetch the new incomes
        fetchIncomes()
    }

    return (
        <Stack direction={{ base: 'column', md: 'row' }} gap={5} >
            <Stack direction={{ base: 'row', md: 'column' }} gap='5' overflowX={'scroll'}>
                {<IncomeCardList incomes={incomes} setDrawerState={setShowCreateIncomeForm} />}
            </Stack>
            <Stack as={'section'} aria-labelledby="incomeSummaryHeading">

                <Heading as="h2" id="incomeSummaryHeading">
                    Income Summary
                </Heading>

                

                <Button onClick={() => setShowCreateIncomeForm(true)}>
                    <HStack>
                        <LuPlus />
                        <Text>
                            Add Income
                        </Text>
                    </HStack>
                </Button>

            </Stack>



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
        </Stack>
    )
}

export default IncomesPage



