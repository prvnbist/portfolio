import React from 'react'
import { ThemeProvider } from 'styled-components'

import Navbar from '../Navbar'

const theme = {
   fonts: {
      sansSerif: "'Roobert', sans-serif",
      monoSpace: "'IBM Plex Mono', monospace",
   },
   colors: {
      dark: {
         400: '#19191C',
         300: '#202024',
         200: '#303035',
         100: '#55555F',
      },
      blue: {
         400: '#1659DB',
         100: '#719DF0',
      },
   },
   size: {
      xs: '8px',
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '40px',
      xxl: '48px',
   },
}

const Layout = ({ children, meta }) => {
   return (
      <ThemeProvider theme={theme}>
         <Navbar />
         <div>{children}</div>
      </ThemeProvider>
   )
}

export default Layout
