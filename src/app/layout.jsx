"use client"

import Header from '@/components/structure/Header';
import Providers from './Providers'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Grid,
  Stack,
  Card,
} from '@mui/material';

import { Link, Typography } from '@mui/material';
import { useState } from 'react';

export default function RootLayout({ children }) {



  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <Providers>
          <Grid container>
            <Header />
            <Grid as={'main'} xs={8} md={8} lg={8} padding={2}>
              {children}
            </Grid>
            <Grid as={'footer'} xs={12} padding={2}>
              Budget-app &copy;
            </Grid>
          </Grid>
        </Providers>
      </body>
    </html>
  )
}




