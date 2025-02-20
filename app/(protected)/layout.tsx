import { auth } from "@/auth";
import { Grid, Stack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export default async function ManagePagesLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

    const session = await auth()

    if (!session) redirect('/')

    return (
        <Stack p={'5'} maxW={'900px'} align={'center'}>
            <Grid templateColumns={{ base: "1fr" }} gap={5} pb={'20'}>
                {children}
            </Grid>
        </Stack>
    )
}
