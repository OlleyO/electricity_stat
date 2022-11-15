/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        // test: /\.(js|ts)x?$/,
        // for webpack 5 use
        and: [/\.(js|ts)x?$/],
      },

      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    domains: ["random.imagecdn.app", "images.unsplash.com"],
  },

  sassOptions: {
    includePaths: [
      path.join(__dirname, "./src/styles"),
      path.join(__dirname, "./src/styles/*"),
    ],
  },
};

module.exports = nextConfig;
