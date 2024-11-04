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

const FIELDS = [
  { label: 'name', type: 'text' },
  { label: 'email', type: 'email' },
  { label: 'message', type: 'textarea' },
];

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
      className='mt-8 flex w-full flex-col items-start tracking-wide'
      onSubmit={handleOnSubmit}
    >
      {FIELDS.map(({ label, type }) => (
        <Input key={label} label={label} type={type} />
      ))}

      {successMessage && (
        <div className='flex-column flex w-full justify-center'>
          <Alert type='tip' standAlone={true}>{successMessage}</Alert>
        </div>
      )}

      {errorMessage && (
        <div className='flex-column flex w-full justify-center'>
          <Alert type='warning' standAlone={true}>{errorMessage}</Alert>
        </div>
      )}

      <button
        type='submit'
        disabled={isLoading}
        className={clsx(
          'ml-0 mr-auto flex items-center border-2 border-zinc-900 p-4 text-lg font-extrabold uppercase text-zinc-900',
          'lg:mr-0',
          'dark:border-foreground dark:text-foreground'
        )}
      >
        {isLoading && <Spinner />}
        {t('send')}
      </button>
    </form>
  );
}

const Input = ({
  label,
  type,
}: {
  label: string;
  type: string;
}): React.ReactNode => {
  const { t } = useTranslation('common');
  const InputType = type === 'textarea' ? 'textarea' : 'input';

  return (
    <>
      <label
        htmlFor='name'
        className='mb-2 text-xl font-black uppercase lg:text-3xl'
      >
        {t(label)}:
      </label>

      <InputType
        type={type}
        id={label}
        name={label}
        required
        className={clsx(
          'mb-6 w-full border border-zinc-900 p-2 text-foreground',
          'invalid:border-pink-500 invalid:text-pink-600',
          'focus:invalid:border-pink-500 focus:invalid:ring-pink-500',
          'dark:border-slate-800 dark:bg-white dark:text-black',
          {
            'min-h-44': type === 'textarea',
          }
        )}
      />
    </>
  );
};
