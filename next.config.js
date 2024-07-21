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
      {
        source: '/display-rss-feed-in-wordpress',
        destination: '/blog/display-rss-feed-in-wordpress',
        permanent: true,
      },
      {
        source: '/wordpress-transients-what-are-they-and-how-do-i-eat-them',
        destination:
          '/blog/wordpress-transients-what-are-they-and-how-do-i-eat-them',
        permanent: true,
      },
      {
        source: '/understanding-the-wordpress-loop',
        destination: '/blog/understanding-the-wordpress-loop',
        permanent: true,
      },
      {
        source: '/creating-a-contact-form-with-php-and-angularjs',
        destination: '/blog/creating-a-contact-form-with-php-and-angularjs',
        permanent: true,
      },
      {
        source: '/writing-a-download-manager-plugin-with-wordpress',
        destination: '/blog/writing-a-download-manager-plugin-with-wordpress',
        permanent: true,
      },
      {
        source: '/thoughts-about-impostor-syndrome',
        destination: '/blog/thoughts-about-impostor-syndrome',
        permanent: true,
      },
      {
        source: '/primeros-pasos-con-vue-js',
        destination: '/blog/first-steps-with-vue-js',
        permanent: true,
      },
      {
        source: '/eliminar-elementos-de-un-array-en-javascript',
        destination: '/blog/delete-item-from-array-javascript',
        permanent: true,
      },
      {
        source: '/la-importancia-de-no-usar-ftp',
        destination: '/blog/the-importance-of-not-using-ftp',
        permanent: true,
      },
      {
        source: '/como-manejar-wordpress-utilizando-git',
        destination: '/blog/how-to-manage-wordpress-using-git',
        permanent: true,
      },
      {
        source: '/imagenes-de-produccion-en-ambiente-local-con-nginx',
        destination: '/blog/production-images-in-local-env-with-nginx',
        permanent: true,
      },
      {
        source: '/actualizar-un-fork-de-github',
        destination: '/blog/update-a-fork-in-github',
        permanent: true,
      },
      {
        source: '/consejos-para-trabajar-desde-casa',
        destination: '/blog/work-from-home-advice',
        permanent: true,
      },
      {
        source: '/compilando-css-y-javascript-con-wp-scripts',
        destination: '/blog/compiling-css-and-javascript-with-wp-scripts',
        permanent: true,
      },
      {
        source: '/orden-personalizado-de-arrays-en-php',
        destination: '/blog/custom-array-order-in-php',
        permanent: true,
      },
      {
        source: '/usar-arrays-en-sass',
        destination: '/blog/use-arrays-in-sass',
        permanent: true,
      },
    ];
  },
};

module.exports = nextTranslate(nextConfig);
