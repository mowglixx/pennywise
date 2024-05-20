"use client"
import { PageDataContext } from '@/components/structure/PageDataContext'
import React, { useContext, useEffect } from 'react'

const HomePage = () => {
  const [_, setPageName] = useContext(PageDataContext)
  useEffect(() => {
    setPageName("Home")
  }, [])
  return (
    <div>Home</div>
  )
}

export default HomePage