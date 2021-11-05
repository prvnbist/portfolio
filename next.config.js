require('dotenv').config()

module.exports = {
   webpack5: true,
   target: 'serverless',
   webpack: config => {
      config.resolve.fallback = {
         ...config.resolve.fallback,
         fs: false,
         module: false,
      }

      return config
   },
}
