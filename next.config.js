/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WP_GRAPHQL_URL: process.env.WP_GRAPHQL_URL,
  },
  reactStrictMode: true,
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
