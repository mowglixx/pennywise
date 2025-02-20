import { auth } from "@/auth";
import { Stack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function ManagePagesLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const session = await auth()

    if (!session) redirect('/')

    return (
        <Stack p={'5'} maxW={'900px'} align={'center'}>
                {children}
        </Stack>
    )
}
