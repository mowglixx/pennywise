"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AccountButton = () => {
    // Login Button
    // Requires session to be valid to show signout button

    const router = useRouter()
    const session = useSession()
    const [loading, setLoading] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = !!anchorEl;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        if (session.status !== "loading") {
            setLoading(false)
        }
    }, [session.status])


    // Loading
    if (loading) return (
        <>
            <button
                onClick={() => {
                    console.log(
                        loading ? 'please wait... loading login session' : 'how is this possible???'
                    )
                }}
                width={150}
                disabled>
                    Loading...
            </button>
        </>
    )
    return (
        <>
            <button
                variant={"inherit"}
                startIcon={session.status === "authenticated"
                    ? (<Image alt={`${session.data.user.name}'s Display Picture`} src={session.data.user.image} />)
                    : (<p>G</p>)}
                onClick={async (e) => {
                    return session.status !== "authenticated" ? signIn('google', {callbackUrl: '/dashboard'}) : handleClick(e)} }
                size="large"
                p={6}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                width={150}
            >
                {session.status === "authenticated" ? session.data.user.name : 'Signin with Google'}
            </button>
            <ul
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                <li onClick={(e)=>{
                    handleClose(e)
                    return router.push('/dashboard')
                    
                    }}>Dashboard</li>
                <li onClick={(e)=>{
                    handleClose(e)
                    return router.push('/manage/account')
                    
                    }}>Account Settings</li>
                <hr/>
                <li onClick={(e)=>{
                    handleClose(e)
                    return router.push('/help')
                    }}>Help</li>
                <hr/>
                <li onClick={async (e)=>{
                    handleClose(e) 
                    return signOut()
                    }}>Signout</li>
            </ul>
        </>

    )

}
export default AccountButton