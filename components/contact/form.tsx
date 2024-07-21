/**
 * External dependencies
 */
import type { FormEvent } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

/**
 * Internal dependencies
 */
import Alert from '@/components/alerts';
import { Spinner } from '@/components/icons';

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('common');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const formValues = Object.fromEntries(new FormData(form).entries());

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        console.error(response);
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      setSuccessMessage(() => t('contactSuccess'));
      setIsLoading(false);

      form.reset();
    } catch (error: unknown) {
      console.error(error);
      setErrorMessage(() => t('contactError'));
      setIsLoading(false);
    }
  };

  return (
    <form
      className='mt-8 flex w-full flex-col items-start'
      onSubmit={handleOnSubmit}
    >
      <label htmlFor='name' className='mb-2'>
        {t('name')} *
      </label>
      <input
        type='text'
        id='name'
        name='name'
        required
        className={clsx(
          'mb-4 w-full rounded border border-gray-300 p-2 text-foreground',
          'invalid:border-pink-500 invalid:text-pink-600',
          'focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
          'dark:border-slate-900 dark:bg-white dark:text-black'
        )}
      />

      <label htmlFor='email' className='mb-2'>
        {t('email')} *
      </label>
      <input
        type='email'
        id='email'
        name='email'
        required
        className={clsx(
          'mb-4 w-full rounded border border-gray-300 p-2 text-foreground',
          'invalid:border-pink-500 invalid:text-pink-600',
          'focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
          'dark:border-slate-900 dark:bg-white dark:text-black'
        )}
      />

      <label htmlFor='message' className='mb-2'>
        {t('message')} *
      </label>
      <textarea
        id='message'
        name='message'
        required
        className={clsx(
          'mb-4 min-h-44 w-full rounded border border-gray-300 p-2 text-foreground',
          'invalid:border-pink-500 invalid:text-pink-600',
          'focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
          'dark:border-slate-900 dark:bg-white dark:text-black'
        )}
      />

      {successMessage && (
        <div className='flex-column flex w-full justify-center'>
          <Alert type='tip'>{successMessage}</Alert>
        </div>
      )}

      {errorMessage && (
        <div className='flex-column flex w-full justify-center'>
          <Alert type='warning'>{errorMessage}</Alert>
        </div>
      )}

      <button
        type='submit'
        disabled={isLoading}
        className={clsx(
          'mt-4 flex items-center rounded-lg border border-red-700 bg-background px-4 py-2 font-bold uppercase text-primary transition-colors',
          'hover:bg-red-50',
          'disabled:cursor-not-allowed disabled:border-gray-900 disabled:bg-red-50 disabled:text-gray-500',
          'dark:border-slate-900 dark:text-white dark:hover:bg-slate-900'
        )}
      >
        {isLoading && <Spinner />}
        Submit
      </button>
    </form>
  );
}
