/**
 * Next dependencies
 */
import {
  Merriweather,
  Long_Cang,
  Noto_Sans_Mono,
  Raleway,
} from 'next/font/google';

export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['italic'],
});
export const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});
export const longCang = Long_Cang({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});
export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});
