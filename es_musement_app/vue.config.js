module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'it',
      fallbackLocale: 'en',
      localeDir: '/assets/locales',
      enableInSFC: true,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_variables.scss";',
      },
    },
  },
};
