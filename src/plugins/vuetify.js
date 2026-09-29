// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#1565C0",
          secondary: "#0D2A4A",
          accent: "#00ACC1",
          surface: "#FFFFFF",
          background: "#F5F7FA",
          "on-surface": "#16202A",
          "on-background": "#16202A",
          grey: "#607D8B",
        },
      },
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
