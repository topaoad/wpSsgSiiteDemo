/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WP_GRAPHQL_URL: process.env.WP_GRAPHQL_URL,
    WP_IMAGES_URL: process.env.WP_IMAGES_URL,

  },
  reactStrictMode: true,
  images: {
    domains:[ process.env.WP_IMAGES_URL],
  },
};

module.exports = nextConfig;
