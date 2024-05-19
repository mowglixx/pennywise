import { ArrowDownward, ArrowDownwardOutlined, ArrowUpward, ArrowUpwardOutlined, DashboardOutlined, DashboardRounded, Google, Menu, PaidOutlined, PaidSharp } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Skeleton, SwipeableDrawer, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountButton from "@/components/elements/AccountButton";

const Header = () => {

    const appRouter = useRouter()
    const [open, setOpen] = useState(true);
    const session = useSession()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (session.status !== "loading") {
            setLoading(false)
        }
    }, [session.status])

    const toggleDrawer = (newOpen = !open) => () => {
        setOpen(newOpen);
    };


    const PRIMARY_NAV_ITEMS = [
        {
            label: 'Incomes',
            href: '/manage/incomes',
            icon: (<ArrowUpwardOutlined />)

        },
        {
            label: 'Expenses',
            href: '/manage/expenses',
            icon: (<ArrowDownwardOutlined />)

        },
    ]
    const INCOME_NAV_ITEMS = [
        {
            label: 'Incomes',
            href: '/manage/incomes',
            icon: (<PaidOutlined />)

        },
    ]
    const EXPENSE_NAV_ITEMS = [
        {
            label: 'Expenses',
            href: '/manage/expenses',
            icon: (<ArrowDownwardOutlined />)

        },
        {
            label: 'Bills',
            href: '/manage/expenses/bills',
            icon: (<PaidOutlined />)

        },
        {
            label: 'Purchases',
            href: '/manage/expenses/purchases',
            icon: (<PaidOutlined />)

        },
        {
            label: 'Food Budgets',
            href: '/manage/expenses/food',
            icon: (<PaidOutlined />)

        },
    ]



    const DrawerList = (
        <Grid role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => appRouter.push('/dashboard')}>
                        <ListItemIcon>
                            <DashboardOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Dashboard'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {PRIMARY_NAV_ITEMS.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => appRouter.push(`${item?.href ? item.href : '#'}`)}>
                            <ListItemIcon>
                                {item?.icon ?? item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item?.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader>
                        Income
                    </ListSubheader>
                }
            >
                {INCOME_NAV_ITEMS.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => appRouter.push(`${item?.href ? item.href : '#'}`)}>
                            <ListItemIcon>
                                {item?.icon ?? item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item?.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader>
                        Expense
                    </ListSubheader>
                }>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => appRouter.push('/manage/expenses')}>
                        <ListItemIcon>
                            <ArrowDownwardOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Expenses'} />
                    </ListItemButton>
                </ListItem>
                {EXPENSE_NAV_ITEMS.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton onClick={() => appRouter.push(`${item?.href ? item.href : '#'}`)}>
                            <ListItemIcon>
                                {item?.icon ?? item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item?.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem>
                </ListItem>
            </List>
        </Grid>
    );


    return (
        <Grid container>
            <AppBar>
                <Toolbar>
                    <IconButton size="large" color="inherit" title='Open Navigation' onClick={toggleDrawer(true)}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {process.env.BRAND_NAME || 'Pennywise'}
                    </Typography>
                    <AccountButton />
                </Toolbar>
            </AppBar>
            <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Grid>
                    <AccountButton />
                    {DrawerList}
                </Grid>
            </SwipeableDrawer>
        </Grid>
    )
}
export default Header