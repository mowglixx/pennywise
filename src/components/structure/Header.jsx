import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountButton from "@/components/elements/AccountButton";
import Link from "next/link";

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

    return(
        <nav>
            <ul>
                {links.map(link => (
                    <li key={link.id}><Link href={link.href}>{link.label}</Link></li>
                ))}
            </ul>
            <AccountButton />
        </nav>
    )
}
export default Header