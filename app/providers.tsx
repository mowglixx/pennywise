import ChakraProvider from "@/components/ui/provider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </SessionProvider>
    )
}
export default Providers