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
} from '@mui/material';


export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <Providers>
          <Grid container>
            <Grid item as={'header'} xs={12}>
              <Header />
            </Grid>
            <Grid item as={'main'} xs={12} mt={12}>
              <Card>
                <CardContent>
                  {children}
                </CardContent>
              </Card>
            </Grid>
            <Grid item as={'footer'} xs={12} padding={2}>
              Budget-app &copy;
            </Grid>
          </Grid>
        </Providers>
      </body>
    </html>
  )
}




