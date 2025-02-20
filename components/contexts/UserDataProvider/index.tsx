'use client'
import { Prisma } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { createContext, useEffect, useState } from 'react'

export interface IEmptyUser {
    name: string,
    email: string,
    image: string,
    incomes: Prisma.IncomeCreateWithoutUserInput[],
    expenses: Prisma.ExpenseCreateWithoutUserInput[],
    bills: Prisma.BillCreateWithoutUserInput[],
    shopping: Prisma.ShoppingCreateWithoutUserInput[],
}


const emptyUser: IEmptyUser = {
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