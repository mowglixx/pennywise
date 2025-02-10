"use client"

// imports
// import { useSession, } from "next-auth/react"
// import Link from "next/link";

// Local imports
// import BrandLogo from "@/components/atoms/BrandLogo";
import HeaderNav from "@/components/organisms/HeaderNav";
import { Heading, HStack, Link, LinkBox, LinkOverlay, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { LuBanknote } from "react-icons/lu";


// import styles from './styles.module.css'


const Header = () => {

  const { data } = useSession()

  const navItems = []

  if (data?.user) {
    navItems.push(
      {
        id: 'home',
        href: '/manage/dash',
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
      });
  }

  navItems.push({
    id: 'help',
    href: '/help',
    label: 'Help',
    description: 'Docs and FAQ'
  })
  return (
    <Stack p={'5'} outline={'solid'} _backdrop={{ backdropBlur: '5px', backdropBrightness: '50%' }}>
      <HStack justifyContent={'space-between'}>
        <LinkBox>
          <LinkOverlay asChild>
            <Link aria-label="Homepage" href="/">
              <LuBanknote />
              <Heading as={'h1'}>
                Pennywise
              </Heading>
            </Link>
          </LinkOverlay>
        </LinkBox>
        <HeaderNav navItems={navItems} />
      </HStack>
    </Stack>
  )
}
export default Header