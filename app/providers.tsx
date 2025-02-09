import Provider from "@/components/ui/provider";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <Provider>
                {children}
            </Provider>
        </SessionProvider>
    )
}
export default Providers