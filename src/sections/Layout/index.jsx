import React from 'react'
import { ThemeProvider } from 'styled-components'

import Navbar from '../Navbar'

import { GlobalStyle, StyledWrapper } from './styles'

const theme = {
   fonts: {
      sansSerif: "'Roobert', sans-serif",
      monoSpace: "'IBM Plex Mono', monospace"
   },
   colors: {
      dark: {
         400: '#19191C',
         300: '#202024',
         200: '#303035',
         100: '#55555F'
      },
      blue: {
         400: '#1659DB',
         100: '#719DF0'
      }
   },
   size: {
      xs: '8px',
      sm: '16px',
      md: '24px',
      lg: '32px',
      xl: '40px',
      xxl: '48px'
   }
}

const Layout = ({ children }) => {
   return (
      <ThemeProvider theme={theme}>
         <GlobalStyle />
         <Navbar />
         <StyledWrapper>
            <div>{children}</div>
         </StyledWrapper>
      </ThemeProvider>
   )
}

export default Layout
