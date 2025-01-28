"use client"

// global imports
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// local imports
import { Providers } from './Providers';
import Header from '@/components/structure/Header';
import { BreadcrumbsContext } from '@/components/Contexts';
import Link from 'next/link';


export default function MainStructureLayout({ children }) {

  const [pageData, setPageData] = useState([])
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.split('/').length > 1) setPageData(pathname.split('/'))
  }, [pathname])

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <Providers>
          <Header />
          <div>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}