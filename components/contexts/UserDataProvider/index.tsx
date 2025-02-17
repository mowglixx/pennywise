'use client'
import { UserDataModel } from '@/infrastructure/prismaRepository'
import { useSession } from 'next-auth/react'
import { createContext, useEffect, useMemo, useState } from 'react'


const emptyUser: UserDataModel = {
    name: "",
    email: "",
    image: "",
    incomes: [],
    expenses: [],
    bills: [],
    food_shop: [],
}


export const UserDataContext = createContext({ userData: { ...emptyUser }, update() { } })


export default function UserDataProvider({ children }: { children: React.ReactNode }) {

    const [userData, setUserData] = useState(emptyUser)
    const userSession = useSession()
    // memo an empty user to prevent re-renders
    const triggerUpdate = () => {

        // get active session
        if (userSession.status === 'authenticated') {
            fetch('/api/userdata')
                .then(res => res.json())
                .then(data => { setUserData(data); return data })
                .then(console.log)
        } else {
            setUserData({ ...emptyUser })
        }
    }



    useEffect(triggerUpdate, [userSession])

    return <UserDataContext.Provider value={{ userData, update: triggerUpdate }}>{children}</UserDataContext.Provider>

}