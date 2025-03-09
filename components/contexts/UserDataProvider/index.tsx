'use client'
import { Prisma } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'

interface IncomeExtended extends Prisma.IncomeCreateWithoutUserInput {
    paydays: Date[]
}
interface ExpenseExtended extends Prisma.ExpenseCreateWithoutUserInput {
    paydays: Date[]
}
interface BillExtended extends Prisma.BillCreateWithoutUserInput {
    paydays: Date[]
}
interface ShoppingExtended extends Prisma.ShoppingCreateWithoutUserInput {
    paydays: Date[]
}

export interface IUserData {
    name: string,
    email: string,
    image: string,
    incomes: IncomeExtended[],
    expenses: ExpenseExtended[],
    bills: BillExtended[],
    shopping: ShoppingExtended[],
}


const emptyUser: IUserData = {
    name: "",
    email: "",
    image: "",
    incomes: [],
    expenses: [],
    bills: [],
    shopping: [],
}


export const UserDataContext = createContext({ userData: { ...emptyUser }, update() { } })


export default function UserDataProvider({ children }: { children: React.ReactNode }) {

    const [userData, setUserData] = useState(emptyUser)
    const userSession = useSession()

    // used to reload data
    const triggerUpdate = () => {

        // get active session
        if (userSession.status === 'authenticated') {
            fetch('/api/userdata')
                .then(res => res.json())
                .then(data => { setUserData(data); return data })
                // .then(console.log)
        } else {
            setUserData({ ...emptyUser })
        }
    }


    // update on session change to clear data
    useEffect(triggerUpdate, [userSession.status])

    return (<UserDataContext.Provider value={{ userData, update: triggerUpdate }}>
        {children}
    </UserDataContext.Provider>)

}