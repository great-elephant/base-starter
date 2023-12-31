const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
module.exports =  withNextIntl(withBundleAnalyzer({
  transpilePackages: ['@sdks/uikit-react'],
}));
