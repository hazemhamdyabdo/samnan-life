import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDateInput } from "vuetify/labs/VDateInput";

const theme = {
  options: { customProperties: true },
  defaultTheme: "light",
  themes: {
    light: {
      colors: {
        background: "#F2F3F7",
        "color-text": "#474747",
        "background-200": "#E8E8EF",
        "theme-white": "#fff",
        primary: "#223F99",
        "grey-300": "#959595",
        "grey-400": "#818181",
        header: "#353535",
        "pri-light": "#E9EFFF",
        secondary: "#2A3342",
        body: "#5D5D5D",
        tertiary: "#2F2F2F",
        "theme-text": "#393939",
        "gray-500": "#585858",
        "gray-800": "#616161",
        "gray-900": "#A7A7A7",
        "border-light": "#B2B2B2",
        "border-light-200": "#CECECE",
        "light-gray": "#C3C3C3",
        "light-gray-2": "#454545",
        "disabled-gray": "#EFEFEF",
        "grey-900": "#292929",
        error: "#EF233C",
      },
    },
  },
  treeShake: true,
  rtl: true,
};
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    theme,
    components: {
      VDateInput,
    },
    directives,
    defaults: {
      VTextField: {
        minHeight: "60px",
        rounded: "lg",
        variant: "outlined",
        color: "primary",
        hideDetails: "auto",
        baseColor: "border-light",
      },
      VBtn: {
        elevation: 0,
        rounded: "lg",
        height: "50px",
      },
    },
  });
  app.vueApp.use(vuetify);
});
