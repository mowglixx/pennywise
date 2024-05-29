"use client"

import { ToolbarContext } from "@/components/Contexts";
import {PageToolbar} from "@/components/structure/PageToolbar";
import { Stack } from "@mui/material";
import { useState } from "react"

export default function ManageRouteLayout({ children }) {
  const defaultToolbar = {
    resource: null,
    selectedItem: null,
    forms: null
  }
  const [toolbarState, setToolbarState] = useState({...defaultToolbar});

  return (
    <>
      <ToolbarContext.Provider value={{ toolbarState, setToolbarState }}>
        <Stack spacing={1}>
        <PageToolbar debugging={false} />
        {children}
        </Stack>
      </ToolbarContext.Provider>
    </>
  )
}
