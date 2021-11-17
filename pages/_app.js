import React from 'react'
import tw from 'twin.macro'

import 'styles/global.css'
import GlobalStyles from 'styles/global'

const App = ({ Component, pageProps }) => {
   return (
      <>
         <GlobalStyles />
         <Component {...pageProps} />
         <section tw="lg:w-[980px] bg-[#202024] rounded-lg mx-4 lg:mx-auto py-16 text-center mt-8 mb-16">
            <h2 tw="text-3xl mb-4">Get in touch</h2>
            <p tw="text-xl font-thin mx-auto md:w-7/12">
               Have a project for me, or just want to say Hi🙋🏽‍♂️? Feel free to
               email me at{' '}
               <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:prvnbist@gmail.com"
                  tw="text-yellow-300 underline"
               >
                  prvnbist@gmail.com
               </a>
               .
            </p>
         </section>
         <footer tw="border-t border-gray-800 py-5">
            <p tw="text-center">
               ©{new Date().getFullYear()} Made with 💖 using 👩🏽‍💻NextJs, 💾Github
               & 🌍Vercel.
            </p>
         </footer>
      </>
   )
}

export default App
