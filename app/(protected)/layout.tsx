import { Stack } from "@chakra-ui/react";

export default function ManageLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Stack p={{ base: '5', md: '10', lgTo2xl: '20' }}>
                {children}
        </Stack>
    )
}
