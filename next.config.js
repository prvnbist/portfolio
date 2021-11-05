require('dotenv').config()

module.exports = {
   webpack5: true,
   webpack: config => {
      config.resolve.fallback = {
         ...config.resolve.fallback,
         fs: false,
         module: false,
      }

      return config
   },
}
