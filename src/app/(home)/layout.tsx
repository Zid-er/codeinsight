"use client"
import { ReactNode } from 'react'
import Navbar from '~/components/Navbar'

export default function HomeLayout({ children }: {
  children: ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
