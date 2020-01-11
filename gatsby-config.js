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
            name: 'posts',
            path: `${__dirname}/src/posts`
         }
      },
      {
         resolve: `gatsby-plugin-mdx`,
         options: {
            extensions: [`.mdx`, `.md`],
            gatsbyRemarkPlugins: [`gatsby-remark-prismjs`]
         }
      },
      {
         resolve: `gatsby-plugin-google-analytics`,
         options: {
            trackingId: process.env.TRACK_ID,
            head: true
         }
      }
   ]
}
