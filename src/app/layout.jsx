"use client"

import Providers from './Providers'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Typography, Grid, Link } from '@mui/material';

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <Providers>
          <Grid container>
            <Grid as={'header'} bgcolor={'red'} xs={12} md={12} lg={12} padding={2}>
              <Typography variant='h2' align='center' >
                Budget-app
              </Typography>
            </Grid>
            <Grid as={'main'} bgcolor={'green'} xs={12} md={8} lg={8} padding={2}>
              {children}
            </Grid>
            <Grid as={'footer'} bgcolor={'blue'} xs={12} md={4} lg={4} padding={2}>
              Budget-app
              <Link href="/dashboard">
                Dashboard
              </Link>
            </Grid>
          </Grid>
        </Providers>
      </body>
    </html>
  )
}




