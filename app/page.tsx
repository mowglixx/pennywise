"use client"

import { Heading, Stack, Text, Card, Em, Button, HStack, StackSeparator, Link } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession()

  return (
    <Stack as={'section'} p={{ base: '5' }} aria-label="Home">
      {/* Section */}
      <Stack as={'article'} py={'60'} gapY={'10'} textAlign={{ base: 'center' }} justifyContent={'center'}>
        <Heading as={'h2'} fontSize={{ base: '4xl' }}>Pennywise</Heading>
        <Text>A budget tracker so simple, even a kid could use it.</Text>
        <Em> Because tracking money sucks.</Em>
        <HStack justifyContent={'center'} p={'10'}>
          {status === "unauthenticated" && <Button maxW={'150px'} onClick={() => signIn("google", { redirect: true, redirectTo: '/manage/dash' })}>Sign Up Now</Button>}
        </HStack>
      </Stack>

      {/* Section */}
      <Stack as={'article'} py={'60'} textAlign={{ base: 'center' }}>
        <Heading as={'h2'} fontSize={{ base: '2xl' }}>Feature Showcase</Heading>
        <Stack as={'ul'} gap={{ base: '20' }} direction={{ base: 'column', md: 'row' }} justifyContent={'space-evenly'}>
          <Card.Root maxW={'300px'}>
            <Card.Header fontSize={{ base: 'xl' }}>It has Graphs! (WIP)</Card.Header>
            <Card.Body>

              <p>Stay on top of your money and never get blindsided by a surprise bill again. Unlike your bank, Pennywise actually tells you what&apos;s coming.
              </p>
              <small>just rememeber check the app...</small>
            </Card.Body>
          </Card.Root>
          <Card.Root maxW={'300px'}>
            <Card.Header fontSize={{ base: 'xl' }}>Fancy Web App</Card.Header>
            <Card.Body>
              <p>Use it anywhere, on any device. Mobile, desktop—Pennywise doesn&apos;t care, it just works.</p>
            </Card.Body>
          </Card.Root>
          <Card.Root maxW={'300px'}>
            <Card.Header fontSize={{ base: 'xl' }}>Open Source + Self-Hostabubleble</Card.Header>
            <Card.Body>

              <p>Don&apos;t trust me? Good. You don&apos;t have to. <Link textDecoration={'underline'} target="_blank" href={'https://github.com/mowglixx/pennywise'}>Run it on your own server</Link> and keep your data.</p>
            </Card.Body>
          </Card.Root>
        </Stack>
      </Stack>
      {/* Section */}

      <Stack as={'article'} py={'60'} textAlign={{ base: 'center' }}>
        <Heading as={'h2'} fontSize={{ base: '2xl' }}>Why?</Heading>
        <p>I hit the limits of Google Sheets, and budgeting on my phone felt like medieval torture. Every existing solution was either too complex, abandoned, or locked behind a paywall. IF I&apos;M BAD AT MONEY, WHY DO YOU THINK I CAN AFFORD A BUDGETING APP? So I made Pennywise. It&apos;s free. (Pls donate.)</p>
      </Stack>

      {/* Section */}
      <Stack as={'article'} py={'60'} textAlign={{ base: 'center' }}>
        <Heading as={'h2'} fontSize={{ base: '2xl' }}>Your Data, I don&apos;t want it, ew</Heading>
        <p>Not only do I not want your data—I actively encourage you to self-host Pennywise. The only thing I store is your Google Email and Display Name, just so I can link your account. That&apos;s it. No tracking, no selling, no &quot;trusted partners&quot;.</p>
      </Stack>

      {/* Section */}
      <Stack as={'article'} py={'60'} pb={'80'} textAlign={{ base: 'center' }} justifyContent={'center'}>
        <Heading as={'h2'} fontSize={{ base: '2xl' }}>Support My Work</Heading>
        <Text>This app is built with love, caffeine, and a concerning amount of Walkers (Lays) Crisps. If you like Pennywise and want to keep me fueled, consider donating.If you do, I&apos;ll even add your name to the contributors&apos; page (coming soon).</Text>
        <HStack justifyContent={'center'} p={'10'}>
          <Button maxW={'300px'} asChild>
            <Link href="https://paypal.me/mowglixx">Show Love</Link>
          </Button>
        </HStack>
        <Text>If you don&apos;t want to donate, that&apos;s fine. But don&apos;t come crying to me when I&apos;m out of crisps and the app stops getting updates. 😤</Text>
      </Stack>

    </Stack>
  );
}
