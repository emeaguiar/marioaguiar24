/**
 * Next dependencies
 */
import {
  Merriweather,
  Long_Cang,
  Luckiest_Guy,
  Noto_Sans,
  Noto_Sans_Mono,
  Raleway,
} from 'next/font/google';

export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});
export const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
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
export const luckiestGuySans = Luckiest_Guy({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});
export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
});
