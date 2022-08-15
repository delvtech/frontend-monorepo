// Shared colors from the design system to configure in tailwind and daisy
const colors = {
  lead: "#303030",
  cuprite: "#402729",
  mercurius: "#980026",
  sulfate: "#DAB841",
  salt: "#FAF7F0",
  foundationPrime: "#0D91B5",
};

module.exports = {
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [
      {
        // light mode
        lawful: {
          primary: "#E4F2E8",
          secondary: "#D6D6ED",
          neutral: "#FCEFDF",
          accent: "#08627A",
          "accent-focus": "#042B36",
          "base-100": colors.salt, // Base color of page, used for blank backgrounds
          info: "#3B3BBE",
          "info-focus": colors.foundationPrime,
          success: "#256C01",
          warning: "#BF3E12",
          error: colors.mercurius,
        },

        // "dark mode"
        chaotic: {
          accent: colors.sulfate,
        },
      },
    ],

    // Prefix all daisy- classes so they are easy to search/find globally
    prefix: "daisy-",
  },

  // allows tailwind to tree shake all css not included in the files found in this array.
  content: [
    // .ts allow for long tailwind classes to be extract to their own files.
    "./src/**/*.ts",
    "./src/**/*.tsx",
  ],

  theme: {
    extend: {
      colors,
      fontFamily: {
        mono: [
          "Roboto Mono",
          "source-code-pro",
          "Menlo",
          "Monaco",
          "Consolas",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
};
