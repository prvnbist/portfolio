require('dotenv').config()
const withMDX = require('@next/mdx')({
   extension: /\.mdx?$/,
})

module.exports = withMDX({
   webpack5: true,
   webpack: (config, { isServer }) => {
      if (!isServer) {
         config.resolve.fallback.fs = false
      }
      return config
   },
})
