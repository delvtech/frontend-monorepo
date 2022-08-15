module.exports = {
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  // Use daisyui for now so we can prototype using predefined tailwind classes, eg: .daisy-btn
  daisyui: {
    themes: [
      {
        // "light mode"
        lawful: {
          neutral: "#402729",
          "neutral-focus": "#303030",
          "base-100": "#FAF7F0", // Base color of page, used for blank backgrounds
          accent: "#08627A",
          "accent-focus": "#042B36",
          info: "#3B3BBE",
          "info-focus": "#0D91B5",
          success: "#256C01",
          warning: "#BF3E12",
          error: "#980026",
        },
        // "dark mode"
        chaotic: {
          accent: "#DAB841",
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
      colors: {
        lead: "#303030",
        cuprite: "#402729",
        mercurius: "##980026",
        sulfate: "#DAB841",
        foundationPrime: "#0D91B5",
        // TODO: Add remaining colors
      },
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
