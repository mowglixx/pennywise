"use client"

import { SessionProvider } from 'next-auth/react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { PageDataProvider } from '@/components/structure/PageDataContext';


export default function Providers({ children }) {
  return (
    <>

      <SessionProvider>
    <PageDataProvider>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Kickstart an elegant, consistent, and simple baseline to build upon for MUI. */}
            {children}
          </ThemeProvider>
            {/* This component makes the theme available down the React tree.  */}
        </AppRouterCacheProvider>
        {/* Emotion works OK without this <AppRouterCacheProvider /> but it's recommended to use this provider to improve performance. 
            Without it, Emotion will generate a new tag during SSR for every component. 
            See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153 for why it's a problem. 
            */}
    </PageDataProvider>
      </SessionProvider>
      {/* Provides login sessions */}
    </>

  )
}
