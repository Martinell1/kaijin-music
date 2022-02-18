module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/style/variable.scss";
          @import "@/assets/style/mixin.scss";
        `
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyze').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },

  productionSourceMap: false,
  publicPath: './'
  // publicPath: process.env.NODE_ENV === 'production' ? 'kaijin-music' : './'
}
