// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: false,
  // spaLoadingTemplate: true,
  css: ["~/assets/scss/main.scss"],
  modules: [
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "nuxt-svgo",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
    locales: ["ar", "en"], // used in URL path prefix
    defaultLocale: "ar", // default locale of your project for Nuxt pages and routings
    strategy: "prefix_except_default",
  },
  build: {
    transpile: ["vuetify"],
  },
  svgo: {
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              // customize default plugin options
              inlineStyles: {
                onlyMatchedOnce: false,
              },

              // or disable plugins
              removeDoctype: false,
              removeViewBox: false,
            },
          },
        },
      ],
    },
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
