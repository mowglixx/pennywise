"use client"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Providers } from './Providers';
import { Breadcrumbs, Card, CardContent, CardHeader, Grid, Link, Paper } from '@mui/material';
import Header from '@/components/structure/Header';
import { useEffect, useState } from 'react';
import { BreadcrumbsContext } from '@/components/Contexts';
import { Home } from '@mui/icons-material';
import { usePathname } from 'next/navigation';


export default function MainStructureLayout({ children }) {

  const [pageData, setPageData] = useState([])
  const pathname = usePathname()

  useEffect(() => {
    setPageData([...pathname.split('/')])
  }, [pathname])

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
            <Grid item xs={12} mt={10} mx={2}>
              <Card>
                <BreadcrumbsContext.Provider value={{ pageData, setPageData }}>
                  <CardHeader title={<Breadcrumbs>
                    <Link
                      href={`/`}
                    >
                      <Home />
                    </Link>
                    {!!pageData?.length && pageData?.filter(item => !!item?.trim())
                    .map((page, oi, arr) => (
                      <Link
                        key={oi}
                        variant='inherit'
                        href={`/${arr?.filter((pp, ii) => oi >= ii && pp !== '').join('/')}`}
                      >
                        {page}
                      </Link>
                    ))}
                  </Breadcrumbs>} />
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
                : 'Pennywise Budget Tracker'}
            </Grid>
          </Grid>
        </Providers>
      </body>
    </html>
  )
}




