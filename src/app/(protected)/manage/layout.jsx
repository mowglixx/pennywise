"use client"

import { ToolbarContext } from "@/components/Contexts";
import {PageToolbar} from "@/components/structure/PageToolbar";
import { useState } from "react"

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
        <div spacing={1}>
        <PageToolbar debugging={process.env.NODE_ENV == 'development'} />
        {children}
        
        </div>

      </ToolbarContext.Provider>
    </>
  )
}
