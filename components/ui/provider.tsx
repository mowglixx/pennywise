"use client"

import { ChakraProvider, defaultSystem as config } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export default function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={config}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
