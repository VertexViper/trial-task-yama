"use client"
import React from "react"
import { useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"

interface PrivateRoutesProps {
  children: React.ReactNode
}

const PrivateRoutes = ({ children }:PrivateRoutesProps) => {
  const pathName = usePathname()
  const { status } = useSession()

  if (pathName.toString().indexOf('auth')===-1 && status !== 'authenticated' && status !=='loading') {
    redirect('/auth')
  }

  return children
}

export default PrivateRoutes
