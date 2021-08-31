import React from 'react'
import tw from 'twin.macro'

import '../styles/global.css'
import GlobalStyles from '../styles/global'

const App = ({ Component, pageProps }) => {
   return (
      <>
         <GlobalStyles />
         <Component {...pageProps} />
         <footer tw="border-t border-gray-800 py-5">
            <p tw="text-center">
               ©{new Date().getFullYear()} Made with 💖 using 👩🏽‍💻NextJs, 💾Github
               & 🌍Netlify.
            </p>
         </footer>
      </>
   )
}

export default App
