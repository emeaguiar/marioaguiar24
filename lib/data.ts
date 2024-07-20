export const MENU_ITEMS = [
  {
    key: 'portfolio',
    href: '/',
  },
  {
    key: 'blog',
    href: '/blog',
  },
  {
    key: 'contact',
    href: '?modal=1',
  },
];

export const BLOG_PREFIX = '/blog';

export const CONTACT_FORM_FROM_EMAIL = process.env
  .CONTACT_FORM_FROM_EMAIL as string;
export const CONTACT_FORM_TO_EMAIL = process.env
  .CONTACT_FORM_TO_EMAIL as string;
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN as string;
export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY as string;
