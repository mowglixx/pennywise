"use client"

import styles from './styles.module.css'
import AccountButton from "@/components/atoms/AccountButton";
import { useState } from "react";
import { Button, Stack, Heading, Link, LinkOverlay, Text, LinkBox, HStack } from "@chakra-ui/react";
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
            <HStack justifyContent={'flex-end'}>
                <AccountButton />
                <Button onClick={() => setNavExpand(!navExpand)}><LuMenu /></Button>
                <DrawerRoot open={navExpand} aria-hidden={!navExpand}>
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
                        <DrawerFooter>

                        </DrawerFooter>
                    </DrawerContent>
                </DrawerRoot>
            </HStack>
        </>
    );
}