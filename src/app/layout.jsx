"use client"

import Header from '@/components/structure/Header';
import Providers from './Providers'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { PageDataContext } from '@/components/structure/PageDataContext';


export default function RootLayout({ children }) {

  const [pageData, _] = useContext(PageDataContext)

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <Providers>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12} my={12} mx={2}>
              <Card>
              <Typography variant='h3'>
                {pageData}
              </Typography>
                <CardContent>
                  {children}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} padding={2}>
              {process.env.NEXT_PUBLIC_BRAND_NAME ? `${process.env.NEXT_PUBLIC_BRAND_NAME} - Powered by Pennywise` : 'Pennywise'} &copy;
            </Grid>
          </Grid>
        </Providers>
      </body>
    </html>
  )
}




