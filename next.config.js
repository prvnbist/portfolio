require('dotenv').config()

module.exports = {
   typescript: {
      ignoreBuildErrors: true,
   },
   webpack: (config, { isServer }) => {
      if (!isServer) {
         config.node = { fs: 'empty', module: 'empty' }
      }

      return config
   },
}
