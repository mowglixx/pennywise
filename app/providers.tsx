import ChakraProvider from "@/components/contexts/ChakraProvider";
import UserDataProvider from "@/components/contexts/UserDataProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { LocaleProvider, useLocaleContext } from "@chakra-ui/react"
import { Toaster } from "@/components/ui/toaster";
const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <LocaleProvider locale="en-GB">
            <ChakraProvider>

                <UserDataProvider>
                {children}
                <Toaster />
                </UserDataProvider>
            </ChakraProvider>
            </LocaleProvider>
        </SessionProvider>
    )
}
export default Providers