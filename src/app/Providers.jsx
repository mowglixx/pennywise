"use client"

import { SessionProvider } from 'next-auth/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';


export const Providers = ({ children }) => {



  // const BreadcrumbsContext = useContext(BreadcrumbsContext)
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider>
              {children}
            </SessionProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </AppRouterCacheProvider>
    </>

  )
}
