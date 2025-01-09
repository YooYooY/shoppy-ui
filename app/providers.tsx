"use client";

import { ReactElement } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material'
import darkTeme from './dark.theme'
import { AuthContext } from './auth/auth-context'

interface ProviderProps {
  children: ReactElement[]
  authenticated: boolean
}

export default function Providers({ children, authenticated }: ProviderProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTeme}>
        <AuthContext.Provider value={authenticated}>{children}</AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
