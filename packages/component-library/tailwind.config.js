module.exports = {
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  // Use daisyui for now so we can prototype using predefined tailwind classes, eg: .daisy-btn
  daisyui: {
    // brutalist wireframing theme while we prototype
    themes: ["cmyk"],

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
      colors: {},
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
