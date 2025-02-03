"use client"

import Link from "next/link";

import styles from './styles.module.css'
import AccountButton from "@/components/atoms/AccountButton";
import { useState } from "react";

interface Props {
    navItems: {
        id: string;
        href: string;
        label: string;
        description: string;
    }[]
}

export default function HeaderNav({ navItems }: Props) {

    const [navExpand, setNavExpand] = useState(true);

    return (
        <section className={styles.navWrapper}>
            <nav className={styles.navWrapper__nav}>
                <ul className={styles.navWrapper_nav__list} aria-hidden={navExpand ? "true" : "false"}>
                    {navItems.map(({ id, href, label, description, ...props }) => (
                        <li className={styles.navWrapper_nav_list__item} key={id}>
                            <Link className={styles.navWrapper_nav_list_item__link} href={href} target="_self" {...props}>{label}</Link>
                            {description && <p>{description}</p>}
                        </li>
                    ))}
                </ul>
                <div className={styles.navWrapper_nav__buttonWrapper}>
                    <AccountButton />
                    <button className={styles.navWrapper_nav_buttonWrapper__navExpand} onClick={() => setNavExpand(!navExpand)}>{!navExpand ? '+' : 'x'}</button>
                </div>
            </nav>
        </section>
    );
}