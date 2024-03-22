"use client"

import React from "react"
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  children: React.ReactNode
}

export const Provider: React.FC<ProvidersProps> = ({ children }) => (
  <SessionProvider>
    {children}
  </SessionProvider>
)
