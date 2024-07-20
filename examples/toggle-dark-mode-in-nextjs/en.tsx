/**
 * External dependencies
 */
import { useState } from 'react';
import { SunIcon } from '@heroicons/react/24/outline';

export function LightExample() {
  return (
    <main>
      <div className='flex flex-col items-center bg-yellow-100 p-8 text-slate-900'>
        <h1 className='text-4xl font-bold text-red-700'>Hello, world!</h1>
        <p className='mt-4 text-lg'>Welcome to my website!</p>
      </div>
    </main>
  );
}

export function DarkExample() {
  return (
    <main>
      <div className='flex flex-col items-center bg-orange-950 p-8 text-yellow-50'>
        <h1 className='text-4xl font-bold text-red-200'>Hello, world!</h1>
        <p className='mt-4 text-lg'>Welcome to my website!</p>
      </div>
    </main>
  );
}

export function SunButtonExample() {
  return (
    <button
      aria-label='Switch to dark mode'
      className='w-min rounded-full bg-yellow-800 p-2 text-yellow-50'
    >
      <SunIcon className='h-6 w-6' />
    </button>
  );
}

export function SunButtonDarkExample() {
  return (
    <button
      aria-label='Switch to dark mode'
      className='w-min rounded-full bg-yellow-100 p-2 text-slate-900'
    >
      <SunIcon className='h-6 w-6' />
    </button>
  );
}

export function ComponentWithButton() {
  return (
    <main>
      <div className='flex flex-col items-center bg-yellow-100 p-4 text-slate-900 dark:bg-orange-950 dark:text-yellow-50'>
        <div className='flex w-full justify-end'>
          <button
            aria-label='Switch to dark mode'
            className='w-min rounded-full bg-yellow-800 p-2 text-yellow-50 dark:bg-yellow-100 dark:text-slate-900'
          >
            <SunIcon className='h-6 w-6' />
          </button>
        </div>

        <h1 className='mt-8 text-4xl font-bold text-red-700 dark:text-red-200'>
          Hello, world!
        </h1>
        <p className='mt-4 text-lg'>Welcome to my website!</p>
      </div>
    </main>
  );
}

export function Component() {
  const [isDarkModeActivated, setIsDarkModeActivated] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkModeActivated(!isDarkModeActivated);
  };

  return (
    <main className={isDarkModeActivated ? 'dark' : 'light'}>
      <div className='flex flex-col items-center bg-yellow-100 p-4 text-slate-900 dark:bg-orange-950 dark:text-yellow-50'>
        <div className='flex w-full justify-end'>
          <button
            aria-label='Switch to dark mode'
            className='w-min rounded-full bg-yellow-800 p-2 text-yellow-50 dark:bg-yellow-100 dark:text-slate-900'
            onClick={toggleDarkMode}
          >
            <SunIcon className='h-6 w-6' />
          </button>
        </div>

        <h1 className='mt-8 text-4xl font-bold text-red-700 dark:text-red-200'>
          Hello, world!
        </h1>
        <p className='mt-4 text-lg'>Welcome to my website!</p>
      </div>
    </main>
  );
}
