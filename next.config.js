const nextTranslate = require('next-translate-plugin');
const i18n = require('./i18n');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
    return [
      {
        source: '/how-to-take-full-advantage-of-your-wordpress-sidebar',
        destination:
          '/blog/how-to-take-full-advantage-of-your-wordpress-sidebar',
        permanent: true,
      },
    ];
  },
};

module.exports = nextTranslate(nextConfig);
