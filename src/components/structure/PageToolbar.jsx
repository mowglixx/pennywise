"use client"

import { useContext } from "react"
import { ToolbarContext } from "../Contexts"

const PageToolbar = (req) => {
  const { toolbarState } = useContext(ToolbarContext)
  
    return (
    <pre title="Toolbar">{ JSON.stringify(toolbarState, null, 2) }</pre>
  )
}
export default PageToolbar