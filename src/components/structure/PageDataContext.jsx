"use client"

import { createContext, useState } from "react"

const defaultValue = 'Home'

export const PageDataContext = createContext('')

export const PageDataProvider = ({children}) => {
  const pageDataState = useState(defaultValue)
  
    return (
    <PageDataContext.Provider value={pageDataState}>{children}</PageDataContext.Provider>
  )
}