/**
 * Next dependencies
 */
import Image from "next/image";

/**
 * Internal dependencies
 */
import { merriweather } from '@/components/fonts';

export default function Card() {
  return (
    (<div className='flex flex-col items-center gap-8 px-4 lg:gap-9'>
      <Image
        src='/avatar.jpg'
        alt='Thumbnail'
        width='100'
        height='100'
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <blockquote className={`${merriweather.className} text-center text-2xl`}>
        <p className='italic'>
          “Sed molestie consectetur erat porta pretium. Donec volutpat porttitor
          risus a vestibulum. Donec sollicitudin lobortis diam, ac finibus nunc.
          Aenean.”
        </p>
      </blockquote>
    </div>)
  );
}
