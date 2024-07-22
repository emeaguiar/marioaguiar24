const nextTranslate = require('next-translate-plugin');
const i18n = require('./i18n');
const redirects = require('./redirects');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
    return redirects;
  },
};

module.exports = nextTranslate(nextConfig);
