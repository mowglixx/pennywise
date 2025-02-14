"use client"

// Imports
import { Stack } from "@chakra-ui/react";
// Local Imports
import Providers from "./providers";
import Header from "@/components/organisms/Header";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Pennywise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
            <Header />
          <Stack pt={'10'} as='main'>
            {children}
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
