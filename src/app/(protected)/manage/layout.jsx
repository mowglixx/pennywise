"use client"

import { ToolbarContext } from "@/components/Contexts";
import PageToolbar from "@/components/structure/PageToolbar";
import { createContext, useState } from "react"

export default function ManageRouteLayout({ children }) {
  const defaultToolbar = {
    resource: null,
    selectedItem: null,
    forms: null
  }
  const [toolbarState, setToolbarState] = useState(defaultToolbar);

  return (
    <>
      <ToolbarContext.Provider value={{ toolbarState, setToolbarState }}>
        <PageToolbar debugging={true} />
        {children}
      </ToolbarContext.Provider>
    </>
  )
}
