"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'


const ContextProviders = ({ children }) => {
  return (
      <SessionProvider>
        {children}
      </SessionProvider>
      )
}

export default ContextProviders