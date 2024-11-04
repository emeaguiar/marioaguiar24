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
      <figure className='relative mx-auto mb-16 mt-8 block aspect-video w-full lg:max-w-screen-md'>
        <Image
          src={src}
          alt={alt || ''}
          fill
          sizes='100vw'
          style={{
            objectFit: 'contain',
          }}
        />
        <figcaption
          className={clsx(
            'absolute -bottom-12 left-1/2 w-max -translate-x-1/2 text-sm/10 italic text-gray-600',
            'dark:text-gray-300'
          )}
        >
          {title}
        </figcaption>
      </figure>
    );
  }

  return (
    <div className='relative mx-auto my-8 aspect-video w-full lg:max-w-screen-md'>
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes='100vw'
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
