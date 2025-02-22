"use client"

// Imports
import { Stack } from "@chakra-ui/react";
// Local Imports
import Providers from "./providers";
import Header from "@/components/organisms/Header";
import { ActionDrawerProvider } from "@/components/contexts/ActionDrawerContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Pennywise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pennywise</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
          <Header />
            <ActionDrawerProvider>
            <Stack pt={'20'} as={'main'} alignItems={'center'}>
            {children}
            </Stack>
          </ActionDrawerProvider>
        </Providers>
      </body>
    </html>
  );
}
