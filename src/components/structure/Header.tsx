import React from "react";
import Link from "next/link";

import AccountButton from "@/components/elements/AccountButton";

import styles from './Header.module.css'
const Header = () => {

    const links = [
        {
            id: "home",
            label: "Home",
            href: '/'
        },
        {
            id: "dash",
            label: "Dashboard",
            href: '/dashboard'
        },
        {
            id: "manage__incomes",
            label: "Incomes",
            href: '/manage/incomes'
        },
        {
            id: "manage__expenses",
            label: "Regular Expenses",
            href: '/manage/expenses'
        },
        {
            id: "manage__expenses__adhoc",
            label: "Ad-Hoc Expenses",
            href: '/manage/expenses/ad-hoc'
        },
        {
            id: "manage__expenses__food",
            label: "Food Shopping",
            href: '/manage/expenses/food'
        },
        {
            id: "help",
            label: "Help",
            href: '/help'
        },
    ]

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <ul className={styles.header_navlist}>
                    {links.map(link => (
                        <li className={styles.header_navlist_item} key={link.id}>
                            <Link className={styles.header_navlist_item_link} href={link.href}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
                <AccountButton />
        </header>
    )
}
export default Header