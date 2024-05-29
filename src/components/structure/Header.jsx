import { ArrowDownward, ArrowDownwardOutlined, ArrowUpward, ArrowUpwardOutlined, BabyChangingStation, DashboardOutlined, DashboardRounded, Google, Menu, PaidOutlined, PaidSharp, QuestionMark, Shop, Shop2 } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Skeleton, SwipeableDrawer, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountButton from "@/components/elements/AccountButton";
import LocalDiningTwoToneIcon from '@mui/icons-material/LocalDiningTwoTone';
import CurrencyPoundTwoToneIcon from '@mui/icons-material/CurrencyPoundTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import AutoAwesomeTwoToneIcon from '@mui/icons-material/AutoAwesomeTwoTone';

const Header = () => {

    const appRouter = useRouter()
    const [open, setOpen] = useState(false);
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
            icon: (<CurrencyPoundTwoToneIcon />)

        },
    ]
    const EXPENSE_NAV_ITEMS = [
        {
            label: 'Bills',
            href: '/manage/expenses/bills',
            icon: (<ReceiptLongTwoToneIcon />)

        },
        {
            label: 'Purchases',
            href: '/manage/expenses/purchases',
            icon: (<AutoAwesomeTwoToneIcon />)

        },
        {
            label: 'Food Budgets',
            href: '/manage/expenses/food',
            icon: (<LocalDiningTwoToneIcon />)

        },
    ]
    const MISC_NAV_ITEMS = [
        {
            label: 'Help',
            href: '/help',
            icon: (<QuestionMark />)

        },
    ]


    
    const DrawerList = (
        <Grid role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem>
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
                    <ListItem key={item.label}>
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
                        Expenses
                    </ListSubheader>}
            >
                {EXPENSE_NAV_ITEMS.map((item) => (
                    <ListItem key={item.label}>
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
                {MISC_NAV_ITEMS.map((item) => (
                    <ListItem key={item.label}>
                        <ListItemButton onClick={() => appRouter.push(`${item?.href ? item.href : '#'}`)}>
                            <ListItemIcon>
                                {item?.icon ?? item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item?.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Grid>
    );


    return (
        <Box>
            <AppBar enableColorOnDark={true} >
                <Toolbar>
                    <IconButton size="large" color="inherit" title='Open Navigation' onClick={toggleDrawer(true)}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {process.env.NEXT_PUBLIC_BRAND_NAME || 'Pennywise'}
                    </Typography>
                    <AccountButton />
                </Toolbar>
            </AppBar>
            <SwipeableDrawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <Grid>
                    {DrawerList}
                </Grid>
            </SwipeableDrawer>
        </Box>

    )
}
export default Header