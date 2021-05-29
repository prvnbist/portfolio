import React from 'react'

import '../styles/global.css'
import GlobalStyles from '../styles/global'

const App = ({ Component, pageProps }) => {
   return (
      <>
         <GlobalStyles />
         <Component {...pageProps} />
      </>
   )
}

export default App
