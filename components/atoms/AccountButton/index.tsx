"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc'


function AccountButton() {

  const session = useSession();

  return (

    <>
      <Button maxW={'15rem'} variant={'solid'} colorPalette={'white'} onClick={() => {
        return session?.status !== "authenticated" ? signIn("google", { redirect: true, redirectTo: '/manage/dash' }) : signOut({ redirect: true, redirectTo: '/' })
      }}>
        {session?.status !== "authenticated" ? (
          // Signed out
          <HStack>
            <FcGoogle /> SignIn With Google
          </HStack>
        ) : (
          // Signed in
          <HStack alignItems={'start'}>
            <Avatar.Root size={'xs'} outline={'solid'} outlineColor={'blue.600'}>
              {session.data?.user?.name && <Avatar.Fallback name={session.data?.user?.name} />}
              {session.data?.user?.image && session.data?.user?.name && <Avatar.Image src={session.data?.user?.image} />}
            </Avatar.Root>
            <Stack gap="0" textAlign={'left'}>
              <Text textStyle={'xs'} fontWeight={'Bold'} truncate>{session.data?.user?.name}</Text>
              <Text color="blue.subtle" textStyle="2xs" fontWeight={'bold'}>
                Click to sign out
              </Text>
            </Stack>
          </HStack>

        )}
      </Button>
    </>
  )
}

export default AccountButton 