"use client"

// imports
import { useSession, } from "next-auth/react"
import Link from "next/link";

// Local imports
import AccountButton from '@/components/atoms/AccountButton'
import BrandLogo from "@/components/atoms/BrandLogo";

// Header to contain navigation and AccountButton
const Header = () => {
  const session = useSession()

  const navItems = [
    {
      id: 'home',
      href: '/',
      label: 'Home',
      description: ''
    }
  ]

  if (session.status === 'authenticated') {
    navItems.push(
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

  navItems.push({
    id: 'help',
    href: '/',
    label: 'Help',
    description: 'Docs and FAQ'
  })

  return (
    <>
      <header>
        <div>
          <Link href={'/'}>
            <BrandLogo />
          </Link>
        </div>
        <nav>
          <ul>
            {navItems.map(({ id, href, label, description, ...props }) => (
              <li key={id}>
                <Link href={href} target="_self" {...props}>{label}</Link>
                {description && <p>{description}</p>}
              </li>
            ))
            }
          </ul>
        </nav>
        <div className="nav__button-wrapper">
          <AccountButton session={session} />
          <button className="nav-expand">+</button>
        </div>
      </header>

    </>)
};

export default Header