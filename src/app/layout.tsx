import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
   title: 'Praveen Bisht',
   description:
      'Hey👋🏼, I’m a front end engineer with the background in full stack based in New Delhi, India who enjoys building products from idea to implementation.',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <head>
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
         </head>
         <body>{children}</body>
      </html>
   )
}
