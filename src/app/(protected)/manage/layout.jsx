"use client"

import { Button, IconButton } from "@mui/material"

export default function RootLayout({ children }) {
  return (
    <>
    <Button variant="outlined">
        Add
      </Button>
    {children}
    </>
  )
}




