import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'

import Navbar from '../Navbar'

import { StyledWrapper } from './styles'

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

const Layout = ({ children, meta }) => {
   return (
      <ThemeProvider theme={theme}>
         <Helmet>
            <title>{meta.title}</title>
            <meta name="robots" content="index, follow" />
            <meta name="description" content={meta.description} />
            <meta name="keywords" content={meta.keywords} />
            <meta name="author" content={meta.author} />
            {/* Open Graph */}
            <meta property="og:title" content={meta.title} />
            <meta property="og:description" content={meta.description} />
            <meta
               property="og:url"
               content={
                  meta.url
                     ? `https://www.prvnbist.com${meta.url}`
                     : 'https://www.prvnbist.com'
               }
            />
            <meta
               property="og:image"
               content={
                  meta.image ? `https://www.prvnbist.com${meta.image}` : ''
               }
            />
            {/* Twitter tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@prvnbist" />
            <meta name="twitter:creator" content="@prvnbist" />
         </Helmet>
         <Navbar />
         <StyledWrapper>
            <div>{children}</div>
         </StyledWrapper>
      </ThemeProvider>
   )
}

export default Layout
