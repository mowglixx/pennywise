"use client"
import theme from "@/theme"
import { Google } from "@mui/icons-material"
import { Avatar, Button, Divider, Grid, ListItemText, Menu, MenuItem, Skeleton, Typography } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react"
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
            <Button
                variant="inherit"
                startIcon={<Skeleton animation="wave" variant="circular" width={34} height={34}>
                    <Google />
                </Skeleton>}
                onClick={() => {
                    console.log(
                        loading ? 'please wait... loading login session' : 'how is this possible???'
                    )
                }}
                width={150}
                disabled>
                {
                    <Skeleton animation="wave" variant="text" width={150} />
                }
            </Button>
        </>
    )
    return (
        <>
            <Button
                variant={"inherit"}
                startIcon={session.status === "authenticated"
                    ? (<Avatar src={session.data.user.image} width={34} height={34} />)
                    : (<Google />)}
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
            </Button>
            <Menu
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
                <MenuItem onClick={(e)=>{
                    handleClose(e)
                    return router.push('/dashboard')
                    
                    }}>Dashboard</MenuItem>
                <MenuItem onClick={(e)=>{
                    handleClose(e)
                    return router.push('/manage/account')
                    
                    }}>Account Settings</MenuItem>
                <Divider />
                <MenuItem onClick={(e)=>{
                    handleClose(e)
                    return router.push('/help')
                    }}>Help</MenuItem>
                <Divider />
                <MenuItem onClick={async (e)=>{
                    handleClose(e) 
                    return signOut()
                    }}>Signout</MenuItem>
            </Menu>
        </>

    )

}
export default AccountButton