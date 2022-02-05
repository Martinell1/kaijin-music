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
  }
}
