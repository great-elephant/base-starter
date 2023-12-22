const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  transpilePackages: ['@sdks/uikit-react'],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
});
