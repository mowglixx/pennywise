"use client"

// imports
import { Heading, HStack, Link, LinkBox, LinkOverlay, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { LuBanknote } from "react-icons/lu";


// Local imports
import HeaderNav from "@/components/molecules/HeaderNav";
import { useMemo } from "react";

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
    <Stack p={'5'} position={'fixed'} width={'100%'} zIndex={999} outline={'solid'} backdropFilter={'blur(3px) brightness(0.25)'}>
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