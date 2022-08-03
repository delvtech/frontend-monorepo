module.exports = {
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  // Use daisyui for now so we can prototype using predefined tailwind classes, eg: .daisy-btn
  daisyui: {
    themes: [
      {
        // What should our theme be called?
        hotpot: {
          primary: "#38bdf8",
          secondary: "#818CF8",
          accent: "#F471B5",
          neutral: "#1E293B",
          "neutral-focus": "#273449",
          "base-100": "#0F172A",
          info: "#0CA5E9",
          success: "#2DD4BF",
          warning: "#F4BF50",
          error: "#FB7085",
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
