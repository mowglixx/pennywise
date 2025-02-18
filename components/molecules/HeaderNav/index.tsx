"use client"

import AccountButton from "@/components/atoms/AccountButton";
import { useState } from "react";
import { Button, Stack, Link, LinkOverlay, Text, LinkBox, HStack, useMediaQuery } from "@chakra-ui/react";
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { LuMenu } from 'react-icons/lu';
import { ColorModeButton } from '@/components/ui/color-mode';

interface Props {
    navItems: {
        id: string;
        href: string;
        label: string;
        description: string;
    }[]
}

export default function HeaderNav({ navItems }: Props) {

    const [navExpand, setNavExpand] = useState(false);
    return (
        <>
            {/* Navbar Drawer */}
            <DrawerRoot
                open={navExpand}
                aria-hidden={!navExpand}
                placement={{ base: 'end', mdDown: 'top' }}
                size={{ base: 'md', mdDown: 'lg' }}
            >
                    <DrawerBackdrop />
                    <DrawerTrigger />
                    <DrawerContent>
                        <DrawerCloseTrigger onClick={() => setNavExpand(!navExpand)} />
                        <DrawerHeader>
                            <DrawerTitle>
                                Pennywise
                            </DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody as={'nav'}>

                            <Stack as={'ul'}>
                                {navItems.map(({ id, href, label, description, ...props }) => (

                                    <LinkBox key={id} as={'li'}>
                                        <LinkOverlay asChild textStyle={'md'}>
                                            <Link href={href} target="_self" {...props}>{label}</Link>
                                        </LinkOverlay>

                                        {description && (
                                            <Text textStyle={'xs'}>
                                                {description}
                                            </Text>
                                        )}
                                    </LinkBox>
                                ))}
                            </Stack>

                        </DrawerBody>
                        <DrawerFooter justifyContent={'center'}>
                            <AccountButton />
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerRoot>


            {/* Navbar content */}
            <HStack justifyContent={'flex-end'} gapX={'5'}>
                <ColorModeButton />
                <Button onClick={() => setNavExpand(!navExpand)}><LuMenu /></Button>
            </HStack>
        </>
    );
}