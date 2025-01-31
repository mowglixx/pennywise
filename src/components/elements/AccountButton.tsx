"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import styles from "./AccountButton.module.css"
import { useRouter } from "next/navigation.js"
import NextImage from "next/image.js"

const AccountButton = () => {
    // Login Button
    // Requires session to be valid to show signout button

    const router = useRouter()
    const session = useSession()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session.status !== "loading") {
            setLoading(false)
        }
    }, [session.status])


    // Loading
    if (loading) return (
        <>
            <button
                className={styles.account_button}
                disabled>
                Loading...
            </button>
        </>
    )
    return (
        <>
            <button
                className={styles.account_button}
                onClick={async (e) => {
                    return session.status !== "authenticated" && signIn('google', { callbackUrl: '/dashboard' })
                }}

                id="basic-button"
            >
                <div>

                    {session.status === "authenticated" && !!session.data?.user?.name
                        ? (<NextImage
                            priority
                            alt={`${session.data?.user?.name}'s Display Picture`}
                            src={session?.data?.user?.image || ""}
                            width={96}
                            height={96}
                        />)
                        : (<p>G</p>)}
                </div>
                <div>
                    {session.status === "authenticated" ? session.data.user?.name : 'Signin with Google'}
                </div>

            </button>
            <ul
                aria-labelledby='basic-button'
            >
                <li onClick={(e) => {
                    
                    return router.push('/dashboard')

                }}>Dashboard</li>
                <li onClick={(e) => {
                    return router.push('/manage/account')

                }}>Account Settings</li>
                <hr />
                <li onClick={(e) => {
                    return router.push('/help')
                }}>Help</li>
                <hr />
                <li onClick={async (e) => {
                    return signOut()
                }}>Signout</li>
            </ul>
        </>

    )

}
export default AccountButton