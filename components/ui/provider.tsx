"use client"

import { ChakraProvider as Provider, defaultSystem as config } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

export default function ChakraProvider(props: ColorModeProviderProps) {
  return (
    <Provider value={config}>
      <ColorModeProvider {...props} />
    </Provider>
  )
}
