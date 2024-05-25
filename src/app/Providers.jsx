"use client"

import { SessionProvider } from 'next-auth/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';


export const Providers = ({ children }) => {



  // const BreadcrumbsContext = useContext(BreadcrumbsContext)
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider>
              {children}
            </SessionProvider>
          </ThemeProvider>
      </AppRouterCacheProvider>
    </>

  )
}
