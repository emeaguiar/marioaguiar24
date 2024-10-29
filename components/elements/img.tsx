/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Next dependencies
 */
import Image from 'next/image';

interface ImgProps {
  src: string;
  alt?: string;
  title?: string;
}

export const Img = ({ src, alt, title }: ImgProps): JSX.Element => {
    if (title) {
        return (
            <figure className='relative mt-8 mb-16 block w-full aspect-video'>
                <Image
                    src={src}
                    alt={alt || ''}
                    fill
                    sizes='100vw'
                    style={{
                        objectFit: 'contain',
                    }}
                />
                <figcaption className={clsx(
                    'absolute italic text-sm/10 -bottom-12 left-1/2 -translate-x-1/2 w-max text-gray-600',
                    'dark:text-gray-300'
                )}>{title}</figcaption>
            </figure>
        );
    }

  return (
    <span className='relative my-8 block w-full aspect-video'>
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes='100vw'
        style={{
          objectFit: 'contain',
        }}
      />
    </span>
  );
};
