module.exports = {
  locales: ['en', 'es'],
  defaultLocale: 'es',
  pages: {
    '*': ['common', 'alerts'],
    '/': ['home'],
    '/blog': ['blog'],
    '/blog/[slug]': ['blog'],
    '/conferences': ['conferences'],
  },
};
