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
            <Grid as={'header'} xs={12} md={12} lg={12} padding={2}>
              <Typography variant='h2' align='center' >
                Budget-app
              </Typography>
            </Grid>
            <Grid as={'main'} xs={12} md={10} lg={10} padding={2}>
              {children}
            </Grid>
            <Grid as={'footer'} bgcolor={'blue'} xs={12} md={2} lg={2} padding={2}>
              Budget-app &copy;
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




