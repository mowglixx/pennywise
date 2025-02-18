/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { CreateIncomeForm, DeleteIncomeForm, UpdateIncomeForm } from '@/components/molecules/Forms/Income'
import { useDrawer } from '@chakra-ui/react'
import React, { createContext, useContext, useState } from 'react'
import { UserDataContext } from '../UserDataProvider'
import { IncomeModel } from '@/lib/infrastructure/prismaRepository'
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer"

interface IActionDrawerContext {
    actionDrawerState: ActionDrawerState | any,
    setActionForm(resourceType: ActionDrawerResourceTypeKey, action: ActionDrawerResourceActionKey, resourceObject: any): void,
    toggleDrawerAndUpdate(): void
}


type ActionDrawerResourceTypeKey = "income" | "expense" | "bill" | "food_shop";
type ActionDrawerResourceActionKey = "create" | "update" | "delete";
type ActionDrawerActionObject = {
    title: string
    Component(): React.JSX.Element
}


type ActionDrawerResourceActionObject = {
    [key in ActionDrawerResourceActionKey]: ActionDrawerActionObject
}
type ActionDrawerFormObject = {
    [key in ActionDrawerResourceTypeKey]: ActionDrawerResourceActionObject
}

const forms: ActionDrawerFormObject = {
    income: {
        create: {
            title: "Create a new Income",
            Component: CreateIncomeForm
        },
        update: {
            title: "Update this Income",
            Component: UpdateIncomeForm
        },
        delete: {
            title: "Delete Income?",
            Component: DeleteIncomeForm
        }
    },
    expense: {
        create: {
            title: "Create a new Income",
            Component: CreateIncomeForm
        },
        update: {
            title: "Update this Income",
            Component: UpdateIncomeForm
        },
        delete: {
            title: "Delete Income?",
            Component: DeleteIncomeForm
        }
    },
    bill: {
        create: {
            title: "Create a new Income",
            Component: CreateIncomeForm
        },
        update: {
            title: "Update this Income",
            Component: UpdateIncomeForm
        },
        delete: {
            title: "Delete Income?",
            Component: DeleteIncomeForm
        }
    },
    food_shop: {
        create: {
            title: "Create a new Income",
            Component: CreateIncomeForm
        },
        update: {
            title: "Update this Income",
            Component: UpdateIncomeForm
        },
        delete: {
            title: "Delete Income?",
            Component: DeleteIncomeForm
        }
    },
}

const defaultState = {
    resourceType: undefined,
    action: undefined,
    actionDrawerChildren: undefined,
    resourceObject: undefined
}

const ActionDrawerContext = createContext<IActionDrawerContext>({
    actionDrawerState: defaultState,
    setActionForm: (resourceType: ActionDrawerResourceTypeKey, action: ActionDrawerResourceActionKey, resourceObject: any = undefined) => { },
    toggleDrawerAndUpdate: () => { }
})


export type ActionDrawerState = {
    actionDrawerChildren?: ActionDrawerActionObject,
    resourceType?: ActionDrawerResourceTypeKey,
    action?: ActionDrawerResourceActionKey,
    resourceObject?: IncomeModel
}


export const ActionDrawerProvider = ({ children }: { children: React.ReactNode }) => {

    const { update } = useContext(UserDataContext)
    const [drawerExpand, setDrawerExpand] = useState(false);

    const [actionDrawerState, setActionDrawerState] = useState<ActionDrawerState>(defaultState);

    const setActionForm = (resourceType: ActionDrawerResourceTypeKey, action: ActionDrawerResourceActionKey, resourceObject: any = undefined) => {

        if (["income", "expense", "bill", "food_shop"].includes(resourceType) && ["create", "update", "delete"].includes(action)) {
            setActionDrawerState({ ...defaultState, actionDrawerChildren: forms[resourceType][action], resourceObject })
            if (resourceObject) {
                console.log({ resourceObject })
            }
            setDrawerExpand(true)
        }

    }

    const toggleDrawerAndUpdate = () => {
        setDrawerExpand(false)
        setActionDrawerState(defaultState)
        update()
    }

    return (
        <ActionDrawerContext.Provider value={{ actionDrawerState, setActionForm, toggleDrawerAndUpdate, }}>
            <DrawerRoot
                open={drawerExpand}
                aria-hidden={!drawerExpand}
                placement={{ base: 'end', smDown: 'bottom' }}
                size={{ base: 'md', smDown: 'full' }}
            >
                <DrawerBackdrop />
                <DrawerContent>
                    <DrawerCloseTrigger onClick={() => setDrawerExpand(false)} />
                    <DrawerHeader>
                        <DrawerTitle>
                            {actionDrawerState?.actionDrawerChildren?.title && actionDrawerState.actionDrawerChildren.title}
                        </DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        {actionDrawerState?.actionDrawerChildren?.Component && <actionDrawerState.actionDrawerChildren.Component />}
                    </DrawerBody>
                </DrawerContent>
            </DrawerRoot>
            {children}
        </ActionDrawerContext.Provider>)
}

export const useActionDrawer = () => useContext(ActionDrawerContext)