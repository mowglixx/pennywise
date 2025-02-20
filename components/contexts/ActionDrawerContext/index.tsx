/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { CreateIncomeForm, DeleteIncomeForm, UpdateIncomeForm } from '@/components/molecules/Forms/Income'
import { CreateExpenseForm, UpdateExpenseForm, DeleteExpenseForm } from '@/components/molecules/Forms/Expense'
import React, { createContext, useContext, useState } from 'react'
import { UserDataContext } from '../UserDataProvider'

import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
} from "@/components/ui/drawer"
import { Prisma } from '@prisma/client'

type IActionString = "create" | "update" | "delete";

export type ResourceType =
    Prisma.IncomeCreateWithoutUserInput |
    Prisma.ExpenseCreateWithoutUserInput |
    Prisma.ShoppingCreateWithoutUserInput |
    Prisma.BillCreateWithoutUserInput

export interface ISelectActionObject {
    resourceType?: string,
    selectedResource?: any,
}

type ActionDrawerActionObject = {
    title: string
    Component(): React.JSX.Element
}

export type ActionDrawerState = {
    actionDrawerChildren?: ActionDrawerActionObject,
    resourceType?: Prisma.ModelName,
    action?: IActionString,
    resourceObject?: ResourceType | undefined
}

export interface IActionDrawerContext {
    actionDrawerState: ActionDrawerState | any,
    setActionForm(resourceType: Prisma.ModelName | undefined, action: IActionString, resourceObject: ResourceType | undefined): void,
    toggleDrawerAndUpdate(): void,
    selectedResource: ISelectActionObject
    selectResource(resourceType: Prisma.ModelName | undefined, selectedResource: ResourceType | undefined): void,
}

export type ActionDrawerResourceActionObject = {
    [key in IActionString]: ActionDrawerActionObject
}

export type ActionDrawerFormObject = {
    [key in Prisma.ModelName]: ActionDrawerResourceActionObject
}


export const availableResourceTypes: Prisma.ModelName[] = ["Income", "Expense", "Bill", "Shopping"]
export const actionStringsArr: IActionString[] = ["create", "update", "delete"]

// Only hackers would be able to see these
const emptyForms = {
    create: {
        title: "",
        Component: () => <>Nice Try.</>
    },
    update: {
        title: "",
        Component: () => <>Nice Try.</>
    },
    delete: {
        title: "",
        Component: () => <>Nice Try.</>
    }
}

export const forms: ActionDrawerFormObject = {
    Income: {
        create: {
            title: "Create a new Income",
            Component: CreateIncomeForm
        },
        update: {
            title: "Update this Income",
            Component: UpdateIncomeForm
        },
        delete: {
            title: "Delete this Income?",
            Component: DeleteIncomeForm
        }
    },
    Expense: {
        create: {
            title: "Create a new Expense",
            Component: CreateExpenseForm
        },
        update: {
            title: "Update this Expense",
            Component: UpdateExpenseForm
        },
        delete: {
            title: "Delete this Expense?",
            Component: DeleteExpenseForm
        }
    },
    Bill: {
        create: {
            title: "Create a new Bill",
            Component: CreateIncomeForm
        },
        update: {
            title: "Update this Bill",
            Component: UpdateIncomeForm
        },
        delete: {
            title: "Delete this Bill?",
            Component: DeleteIncomeForm
        }
    },
    Shopping: {
        create: {
            title: "Create a new Shopping Budget",
            Component: CreateIncomeForm
        },
        update: {
            title: "Update this Shopping Budget",
            Component: UpdateIncomeForm
        },
        delete: {
            title: "Delete this Shopping Budget?",
            Component: DeleteIncomeForm
        }
    },
    User: emptyForms, Account: emptyForms, Session: emptyForms, VerificationToken: emptyForms, Authenticator: emptyForms
}

const defaultContext = {
    resourceType: undefined,
    action: undefined,
    actionDrawerChildren: undefined,
    resourceObject: undefined
}



const ActionDrawerContext = createContext<IActionDrawerContext>({
    actionDrawerState: defaultContext,
    setActionForm: (resourceType: Prisma.ModelName, action: IActionString, resourceObject: ResourceType | undefined = undefined) => { },
    toggleDrawerAndUpdate: () => { },
    selectedResource: {
        resourceType: undefined,
        selectedResource: undefined,
    },
    selectResource: (resourceType, selectedResource) => { }
})

export const ActionDrawerProvider = ({ children }: { children: React.ReactNode }) => {

    const { update } = useContext(UserDataContext)
    const [drawerExpand, setDrawerExpand] = useState(false);

    const [actionDrawerState, setActionDrawerState] = useState<ActionDrawerState>(defaultContext);

    const [selectedItem, setSelectedItem] = useState<ISelectActionObject>({
        resourceType: undefined,
        selectedResource: undefined
    })


    const setActionForm = (resourceType: Prisma.ModelName, action: IActionString, resourceObject: ResourceType | undefined = undefined) => {

        if (availableResourceTypes.includes(resourceType) && actionStringsArr.includes(action)) {
            setActionDrawerState({ ...defaultContext, actionDrawerChildren: forms[resourceType][action], resourceObject })
            if (resourceObject) {
            }
            setDrawerExpand(true)
        }

    }

    const toggleDrawerAndUpdate = () => {
        setDrawerExpand(false)
        setActionDrawerState(defaultContext)
        selectResource(undefined, undefined)
        update()
    }
    const selectResource = (resourceType: Prisma.ModelName | undefined, selectedResource: ResourceType | undefined) => {
        if (resourceType && availableResourceTypes.includes(resourceType)) {
            setSelectedItem({ resourceType, selectedResource })
        }
    }

    return (
        <ActionDrawerContext.Provider value={{
            actionDrawerState, setActionForm, toggleDrawerAndUpdate: ()=> toggleDrawerAndUpdate(), selectedResource: selectedItem, selectResource
        }}>
            <DrawerRoot
                open={drawerExpand}
                aria-hidden={!drawerExpand}
                placement={'bottom'}
                size={'md'}
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