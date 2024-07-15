/**
 * Next dependencies
 */
import {
    Merriweather,
    Long_Cang,
    Noto_Sans,
} from "next/font/google";

export const merriweather = Merriweather({ subsets: ["latin"], weight: [ '400', '700' ], style: [ 'normal', 'italic' ] });
export const notoSans = Noto_Sans({ subsets: ["latin"], weight: [ '400', '600' ], style: [ 'normal', 'italic' ] });
export const longCang = Long_Cang({ subsets: ["latin"], weight: [ '400' ], style: [ 'normal' ] });
