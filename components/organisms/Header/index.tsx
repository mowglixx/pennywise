"use client"

// imports
import { useSession, } from "next-auth/react"
import Link from "next/link";

// Local imports
import BrandLogo from "@/components/atoms/BrandLogo";
import HeaderNav from "@/components/organisms/HeaderNav";

import styles from './styles.module.css'

// Header to contain navigation and AccountButton
const Header = () => {

  const session = useSession()
  const navItems = [
  ]

  if (session.status === 'authenticated') {
    navItems.push(
      {
        id: 'home',
        href: '/',
        label: 'Dashboard',
        description: 'See insights about your budget'
      },
      {
        id: 'income',
        href: '/manage/incomes',
        label: 'Incomes',
        description: 'Keep track of your income.'
      },
      {
        id: 'expense',
        href: '/manage/expenses',
        label: 'Expenses',
        description: 'Track One-off expenses.'
      },
      {
        id: 'food_shopping',
        href: '/manage/expenses/food',
        label: 'Food Budget',
        description: 'Manage your food Budget'
      },
      {
        id: 'bill',
        href: '/manage/expenses/bills',
        label: 'Bills',
        description: 'Keep track of bills'
      })
  }
  navItems.push(
    {
      id: 'about',
      href: '/help',
      label: 'About',
      description: 'Learn about pennywise and its features'
    },
    {
      id: 'help',
      href: '/help',
      label: 'Help',
      description: 'Docs and FAQ'
    }
  )


  return (
    <>
      <header className={styles.header}>

        <Link className={styles.header__link} href={'/'}>
          <BrandLogo className={styles.header_link__logo} aria-labelledby="logo-text" />
          <h1 className={styles.header_link__logoText} id="logo-text">Pennywise</h1>
          </Link>
        <HeaderNav navItems={navItems} />
      </header>

    </>)
};

export default Header
