"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { system } from "@/styles"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export function Provider(props: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider>
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}