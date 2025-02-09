"use client"

// Imports
import { Stack } from "@chakra-ui/react";
// Local Imports
import Providers from "./providers";
import Header from "@/components/organisms/Header";

// Styles


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Pennywise" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>

        <Providers>
          <Stack as='main'>
            <Header />
            {children}
          </Stack>
        </Providers>
      </body>
    </html>
  );
}
