import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
