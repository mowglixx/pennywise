"use client"

import { ToolbarContext } from "@/components/Contexts";
import PageToolbar from "@/components/structure/PageToolbar";
import { createContext, useState } from "react"

export default function ManageRouteLayout({ children }) {
  const defaultToolbar = 'income'
  const [toolbarState, setToolbarState] = useState(defaultToolbar);

  return (
    <>
      <ToolbarContext.Provider value={{ toolbarState, setToolbarState }}>
        <PageToolbar />
        {children}
      </ToolbarContext.Provider>
    </>
  )
}
