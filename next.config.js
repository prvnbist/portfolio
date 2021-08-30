require('dotenv').config()

module.exports = {
   webpack5: false,
   webpack: (config, { isServer }) => {
      if (!isServer) {
         config.node = { fs: 'empty', module: 'empty' }
      }

      return config
   },
}
