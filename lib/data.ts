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
    key: 'conferences',
    href: '/conferences',
  },
];

export const BLOG_PREFIX = '/blog';

export const CONTACT_FORM_FROM_EMAIL = process.env
  .CONTACT_FORM_FROM_EMAIL as string;
export const CONTACT_FORM_TO_EMAIL = process.env
  .CONTACT_FORM_TO_EMAIL as string;
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN as string;
export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY as string;

export const CONFERENCES = [
  {
    name: 'WordCamp Lima',
    date: '2016-07-16',
    location: 'Lima, Perú',
    title: 'Seguridad en WordPress',
    href: 'https://2016.lima.wordcamp.org/',
  },
  {
    name: 'WordCamp Barcelona',
    date: '2016-12-03',
    location: 'Barcelona, España',
    title: 'Experimentando UX',
    href: 'https://2016.barcelona.wordcamp.org/',
    video: 'https://wordpress.tv/2017/06/16/mario-aguilar-experimentando-ux/',
  },
  {
    name: 'WordCamp CDMX',
    date: '2017-05-27',
    location: 'Ciudad de México, México',
    title: 'Ambientes en Vagrant y Docker',
    href: 'https://2017.mexicocity.wordcamp.org/',
    video: 'https://www.youtube.com/watch?v=b1BtNL_JgHQ',
  },
  {
    name: 'WordCamp Buenos Aires',
    date: '2017-06-08',
    location: 'Buenos Aires, Argentina',
    title: 'El futuro de Javascript en WP',
    href: 'https://2017.buenosaires.wordcamp.org/',
  },
  {
    name: 'WordCamp Guadalajara',
    date: '2018-08-25',
    location: 'Guadalajara, México',
    title: 'Accesibilidad en la Web',
    href: 'https://2018.guadalajara.wordcamp.org/',
  },
  {
    name: 'WordCamp Puebla',
    date: '2018-11-10',
    location: 'Puebla, México',
    title: 'Regression Testing',
    href: 'https://2018.puebla.wordcamp.org/',
  },
  {
    name: 'WordCamp Montevideo',
    date: '2018-11-24',
    location: 'Montevideo, Uruguay',
    title: 'Regression Testing 2.0',
    href: 'https://2018.montevideo.wordcamp.org/',
    video:
      'https://wordpress.tv/2020/05/29/mario-aguiar-regression-testing-no-avances-hacia-atras/',
  },
  {
    name: 'WordCamp CDMX',
    date: '2019-08-31',
    location: 'Ciudad de México, México',
    title: 'Uso avanzado de Git y WordPress',
    href: 'https://2019.mexicocity.wordcamp.org/speaker/mario-aguiar/',
    presentation:
      'https://docs.google.com/presentation/d/14szinNSckhk0TFDO7wcmp4R18JIoWgjG-RnNqC2JY2A/edit?usp=sharing',
  },
  {
    name: 'WordCamp Puebla',
    date: '2019-11-09',
    location: 'Puebla, México',
    title: 'Desarrollando para Gutenberg, el nuevo paradigma',
    href: 'https://puebla.wordcamp.org/2019/',
    video:
      'https://wordpress.tv/2019/11/18/mario-aguiar-desarrollando-para-gutenberg-el-nuevo-paradigma/',
  },
];
