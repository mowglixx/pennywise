"use client"

import { SessionProvider } from 'next-auth/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import themeGen from '@/theme';
import { useMediaQuery } from '@mui/material';
import { useMemo } from 'react';


export const Providers = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => themeGen(prefersDarkMode),
    [prefersDarkMode],
  );

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
