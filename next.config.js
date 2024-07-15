const nextTranslate = require( 'next-translate-plugin' )
const i18n = require( './i18n' );

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
};

module.exports = nextTranslate( nextConfig );
