/** @type {import("next").NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fixedrates",
        permanent: true,
      },
    ];
  },

  webpack(config) {
    // https://react-svgr.com/docs/webpack/#use-svgr-and-asset-svg-in-the-same-project
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      oneOf: [
        // To import an svg as a url (to be used as an img src), add ?url to
        // the end of the import path.
        // Example: import sampleImgSrc from "sample.svg?url"
        {
          resourceQuery: /url/,
          type: "asset",
        },

        {
          loader: "@svgr/webpack",

          // important to prevent rendering broken SVGs
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        },
      ],
    });

    return config;
  },
};
