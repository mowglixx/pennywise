import ChakraProvider from "@/components/contexts/ChakraProvider";
import UserDataProvider from "@/components/contexts/UserDataProvider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <ChakraProvider>
                <UserDataProvider>
                {children}
                </UserDataProvider>
            </ChakraProvider>
        </SessionProvider>
    )
}
export default Providers