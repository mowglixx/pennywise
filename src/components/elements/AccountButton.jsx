"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./styles.module.css"

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
                width={150}
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
                    return session.status !== "authenticated" ? signIn('google', { callbackUrl: '/dashboard' }) : handleClick(e)
                }}

                id="basic-button"
            >
                <div>

                    {session.status === "authenticated"
                        ? (<Image
                            alt={`${session.data.user.name}'s Display Picture`}
                            src={session.data.user.image}
                            width={96}
                            height={96}
                        />)
                        : (<p>G</p>)}
                </div>
                <div>
                    {session.status === "authenticated" ? session.data.user.name : 'Signin with Google'}
                </div>

            </button>
            <ul
                aria-labelledby='basic-button'
            >
                <li onClick={(e) => {
                    handleClose(e)
                    return router.push('/dashboard')

                }}>Dashboard</li>
                <li onClick={(e) => {
                    handleClose(e)
                    return router.push('/manage/account')

                }}>Account Settings</li>
                <hr />
                <li onClick={(e) => {
                    handleClose(e)
                    return router.push('/help')
                }}>Help</li>
                <hr />
                <li onClick={async (e) => {
                    handleClose(e)
                    return signOut()
                }}>Signout</li>
            </ul>
        </>

    )

}
export default AccountButton