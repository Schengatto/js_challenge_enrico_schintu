module.exports = {
  productionSourceMap: process.env.NODE_ENV !== "production",
  pluginOptions: {
    i18n: {
      locale: "it",
      fallbackLocale: "en",
      localeDir: "/assets/locales",
      enableInSFC: true
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_variables.scss"; @import "@/styles/_commons.scss";'
      }
    }
  }
};
