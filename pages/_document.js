// This code prevents a Flash Of Unstyled Content (FOUC)
// on load. Without it, the styles are only added once
// react loads on the frontend

import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const sheet = new ServerStyleSheet()
      const originalRenderPage = ctx.renderPage
      try {
         ctx.renderPage = () =>
            originalRenderPage({
               enhanceApp: App => props =>
                  sheet.collectStyles(<App {...props} />),
            })
         const initialProps = await Document.getInitialProps(ctx)

         return {
            ...initialProps,
            styles: (
               <>
                  {initialProps.styles}
                  {sheet.getStyleElement()}
               </>
            ),
         }
      } finally {
         sheet.seal()
      }
   }

   render() {
      return (
         <Html>
            <Head>
               <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
               ></script>
               <script
                  dangerouslySetInnerHTML={{
                     __html: `
                     window.dataLayer = window.dataLayer || []; 
                     function gtag() {dataLayer.push(arguments)}; 
                     gtag('js', new Date());
                     gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                     });
                  `,
                  }}
               />
               <script
                  async
                  defer
                  src="https://x-umami.vercel.app/umami.js"
                  data-website-id="7aced01b-fddd-4700-aa4b-d991b33beed5"
               ></script>
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument
