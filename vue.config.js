module.exports = {
  devServer: {
    host: '192.168.1.9',
    port: 8000
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/style/variable.scss";
          @import "@/assets/style/mixin.scss";
        `
      }
    }
  }
}
