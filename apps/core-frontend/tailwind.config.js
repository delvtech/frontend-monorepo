// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // mode: "jit",
  // tree shake tailwind css for production builds
  content: ["./src/**/*.{ts,tsx}"],
  future: {
    // don't use deprecated grid gap utilities
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    minWidth: {
      0: "0",
      "1/4": "25%",
      "1/3": "33%",
      "2/3": "66%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    maxHeight: {
      0: "0",
      "1/4": "25%",
      "1/3": "33%",
      "2/3": "66%",
      "1/2": "50%",
      "3/4": "75%",
      full: "100%",
    },
    spacing: {
      "3/10": "30%",
      200: "200px",
      300: "300px",
      400: "400px",
      500: "500px",
      ...defaultTheme.spacing,
    },

    colors: {
      // these can be used as 'text-primary' etc.
      primary: "var(--bp3-intent-primary)",
      success: "var(--bp3-intent-success)",
      warning: "var(--bp3-intent-warning)",
      danger: "var(--bp3-intent-danger)",
      disabled: "var(--bp3-text-color-disabled)",
      ...defaultTheme.colors,
    },
    extend: {},
  },
};
