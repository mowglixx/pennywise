"use client"

// Imports
import { SessionProvider } from "next-auth/react"

// Local Imports
import Header from "@/components/organisms/Header";

// Styles
import Provider from "@/components/ui/provider";
import { Stack } from "@chakra-ui/react";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Pennywise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Provider>

        <SessionProvider>
            <Header />
            <Stack as='main'>
            {children}
            </Stack>
        </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
