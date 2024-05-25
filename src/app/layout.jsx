"use client"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Providers } from './Providers';
import { Card, CardContent, CardHeader, Grid, Paper } from '@mui/material';
import Header from '@/components/structure/Header';
import { useContext, useState } from 'react';
import { BreadcrumbsContext } from '@/components/Contexts';


export default function MainStructureLayout({ children }) {

  const [pageData, setPageData] = useState('Home')

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
              <BreadcrumbsContext.Provider value={{pageData, setPageData}}>
                  <CardHeader title={pageData} />
                  <CardContent>
                    {children}
                  </CardContent>
              </BreadcrumbsContext.Provider>
                </Card>
              </Grid>
            <Grid item xs={12} padding={2}>
              {process.env.NEXT_PUBLIC_BRAND_NAME ? 
              <>
              {process.env.NEXT_PUBLIC_BRAND_NAME} <sub>Powered by Pennywise Budget Tracker</sub> 
              </>
              : 'Pennywise Budget Tracker'};
            </Grid>
          </Grid>
        </Providers>
      </body>
    </html>
  )
}




