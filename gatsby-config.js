module.exports = {
   siteMetadata: {
      title: 'Praveen Bisht',
      author: 'Praveen Bisht',
      description:
         'Hey👋🏼, I’m Praveen, a software engineer based in New Delhi who enjoys building apps from idea to implementation.',
      siteUrl: 'https://www.prvnbist.com'
   },
   plugins: [
      `gatsby-plugin-styled-components`,
      {
         resolve: 'gatsby-source-filesystem',
         options: {
            name: 'src',
            path: `${__dirname}/src/`
         }
      },
      'gatsby-plugin-sharp',
      `gatsby-transformer-sharp`,
      {
         resolve: 'gatsby-transformer-remark',
         options: {
            plugins: [
               'gatsby-remark-relative-images',
               {
                  resolve: 'gatsby-remark-images',
                  options: {
                     maxWidth: 750,
                     linkImagesToOriginal: false
                  }
               },
               {
                  resolve: `gatsby-remark-prismjs`,
                  options: {
                     classPrefix: 'language-',
                     inlineCodeMarker: null,
                     aliases: {},
                     showLineNumbers: true,
                     noInlineHighlight: false
                  }
               }
            ]
         }
      },
      {
         resolve: `gatsby-plugin-google-analytics`,
         options: {
            trackingId: process.env.GATSBY_API_TRACK_ID,
            head: true
         }
      }
   ]
}
