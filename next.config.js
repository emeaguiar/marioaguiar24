const withMDX = require( '@next/mdx' )();

/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'es',
        localeDetection: false,
    },
    pageExtensions: [
        'js',
        'jsx',
        'mdx',
        'ts',
        'tsx',
    ],
};

module.exports = withMDX( nextConfig );
