module.exports = {
  locales: ['en', 'es'],
  defaultLocale: 'es',
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/blog': ['blog'],
    '/blog/[slug]': ['blog'],
    '/conferences': ['conferences'],
  },
};
