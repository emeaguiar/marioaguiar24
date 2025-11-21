/* eslint-disable @next/next/no-img-element */

export function ExampleOne() {
  return (
    <div className='not-prose rounded-xl border p-4 dark:text-foreground md:p-8'>
      <div className='flex w-full flex-col items-center justify-between md:flex-row'>
        <div className='order-2 md:order-1'>
          <h3 className='mb-4 text-center text-2xl font-semibold md:text-start'>
            Lorem Ipsum
          </h3>

          <div className='flex gap-4'>
            <span className='rounded-lg bg-gray-300 px-2 py-1 text-xs font-semibold uppercase dark:bg-gray-700'>
              Categoría
            </span>
            <span className='rounded-lg bg-gray-300 px-2 py-1 text-xs font-semibold uppercase dark:bg-gray-700'>
              Categoría
            </span>
          </div>
        </div>

        <div className='order-1 mb-2 md:order-2'>
          <img
            className='rounded-full'
            src='https://res.cloudinary.com/dyfxhbbnf/image/upload/v1763762084/45642b05dc8808c35e8b7cfe967421e71f36a204b5fc86c772df82382ea9ba71_sy92zb.png'
            alt='Retrato de Mario Aguiar'
            width='80'
            height='80'
            loading='lazy'
          />
        </div>
      </div>

      <p>
        Ut posuere non massa et feugiat. Suspendisse felis metus, vehicula
        dignissim neque sed, pulvinar varius sapien. In semper scelerisque erat,
        id lobortis diam porta id.
      </p>
    </div>
  );
}

export function ExampleTwo() {
  return <div className='h-5 w-full rounded-lg bg-gray-300' />;
}

export function ExampleThree({ animate = false }) {
  return (
    <div
      className={`not-prose rounded-xl border p-4 md:p-8 ${animate ? 'animate-pulse' : ''}`}
    >
      <div className='mb-4 flex w-full flex-col items-center justify-between md:flex-row'>
        <div className='order-2 w-1/2 md:order-1'>
          <div className='mb-4 h-5 w-full rounded-lg bg-gray-300' />

          <div className='flex justify-center gap-4 md:justify-start'>
            <div className='h-5 w-18 rounded-lg bg-gray-300' />
            <div className='h-5 w-18 rounded-lg bg-gray-300' />
          </div>
        </div>

        <div className='order-1 mb-2 md:order-2'>
          <div className='h-20 w-20 rounded-full bg-gray-300' />
        </div>
      </div>

      <div className='mb-2 h-5 w-full rounded-lg bg-gray-300' />
      <div className='mb-2 h-5 w-full rounded-lg bg-gray-300' />
      <div className='h-5 w-1/3 rounded-lg bg-gray-300' />
    </div>
  );
}
