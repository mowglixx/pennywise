import ChakraProvider from "@/components/contexts/ChakraProvider";
import UserDataProvider from "@/components/contexts/UserDataProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { LocaleProvider, useLocaleContext } from "@chakra-ui/react"
const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <LocaleProvider locale="en-GB">
            <ChakraProvider>

                <UserDataProvider>
                {children}
                </UserDataProvider>
            </ChakraProvider>
            </LocaleProvider>
        </SessionProvider>
    )
}
export default Providers