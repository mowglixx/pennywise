"use client"

import { BreadcrumbsContext } from '@/components/Contexts'

import { useContext, useEffect } from 'react'

const HomePage = () => {
  const {_, setPageData} = useContext(BreadcrumbsContext)
  useEffect(() => {
    setPageData("Home")
  }, [setPageData])
  return (
    <div>Home</div>
  )
}

export default HomePage