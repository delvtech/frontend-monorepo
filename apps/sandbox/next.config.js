const nextConfig = {
  eslint: {
    dirs: ["pages", "src"],
  },
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    // GraphQL Loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
};

module.exports = nextConfig;
