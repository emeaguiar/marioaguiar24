/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * Next dependencies
 */
import Image from 'next/image';

export default function Cards() {
  return (
    <div className='grid w-full items-center gap-8 lg:max-w-screen-xl lg:grid-cols-3 lg:px-4'>
      <CardsRow />
      <CardsRow inverted />
    </div>
  );
}

function CardsRow({ inverted }: { inverted?: boolean }) {
  return (
    <>
      {!inverted && (
        <>
          <div className='h-full lg:overflow-hidden'>
            <Card />
          </div>

          <div className='h-full lg:col-span-2 lg:overflow-hidden'>
            <Card className='lg:aspect-video' />
          </div>
        </>
      )}

      {inverted && (
        <>
          <div className='h-full lg:col-span-2 lg:overflow-hidden'>
            <Card className='lg:aspect-video' />
          </div>

          <div className='h-full lg:overflow-hidden'>
            <Card />
          </div>
        </>
      )}
    </>
  );
}

function Card({ className }: { className?: string }) {
  // @TODO: Fix width in mobile
  return (
    <div className={clsx('flex aspect-project-closed h-full', className || '')}>
      <Image
        src='/thumbnail.jpg'
        alt='Thumbnail'
        width='700'
        height='420'
        className='w-full object-cover'
      />
    </div>
  );
}
