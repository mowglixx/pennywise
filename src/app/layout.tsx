"use client"

// local imports
import ContextProviders from './ContextProviders';
import Header from '@/components/structure/Header';

import './layout.theme.css'
import LayoutStyles from './layout.module.css'

export default function MainStructureLayout({ children } : {children : any}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Pennywise" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={LayoutStyles.body}>
        <ContextProviders>
          <Header />
          <main>
            {children}
          </main>
        </ContextProviders>
      </body>
    </html>
  )
}