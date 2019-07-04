module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-sound-spectrum/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}