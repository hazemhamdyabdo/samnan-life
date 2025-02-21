// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  // spaLoadingTemplate: true,
  css: ["~/assets/scss/main.scss"],
  modules: [
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    '@nuxtjs/leaflet',
    'nuxt-vuefire',
    "nuxt-svgo",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
    locales: ["ar", "en"], // used in URL path prefix
    defaultLocale: "ar", // default locale of your project for Nuxt pages and routings
    strategy: "no_prefix",
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
