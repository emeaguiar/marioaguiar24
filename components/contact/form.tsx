/**
 * External dependencies
 */
import type { FormEvent } from "react";
import { useState } from "react";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";

/**
 * Internal dependencies
 */
import Alert from "@/components/alerts";
import { Spinner } from "@/components/icons";

export default function ContactForm()  {
    const [ isLoading, setIsLoading ] = useState( false );
    const { t } = useTranslation( 'common' );
    const [ successMessage, setSuccessMessage ] = useState( '' );
    const [ errorMessage, setErrorMessage ] = useState( '' );

    const handleOnSubmit = async ( event: FormEvent ) => {
        event.preventDefault();

        if ( isLoading ) {
            return;
        }

        setIsLoading( true );

        const form = event.target as HTMLFormElement;
        const formValues = Object.fromEntries( new FormData( form ).entries() );

        setIsLoading( true );
        setSuccessMessage( '' );
        setErrorMessage( '' );

        try {
            const response = await fetch( '/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formValues ),
            } );

            if ( ! response.ok ) {
                console.error( response );
                throw new Error( `HTTP error Status: ${response.status}` );
            }

            setSuccessMessage( () => t( 'contactSuccess' ) );
            setIsLoading( false );

            form.reset();
        } catch ( error: unknown ) {
            console.error( error );
            setErrorMessage( () => t('contactError') );
            setIsLoading( false );
        }
    }

    return (
        <form
            className="flex flex-col items-start mt-8 w-full"
            onSubmit={ handleOnSubmit }
        >
            <label htmlFor="name" className="mb-2">{ t( 'name' ) } *</label>
            <input type="text" id="name" name="name" required className={ clsx(
                "text-foreground w-full p-2 mb-4 border border-gray-300 rounded",
                "invalid:border-pink-500 invalid:text-pink-600",
                "focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
                "dark:border-slate-900"
            ) } />

            <label htmlFor="email" className="mb-2">{ t( 'email' ) } *</label>
            <input type="email" id="email" name="email" required className={ clsx(
                "text-foreground w-full p-2 mb-4 border border-gray-300 rounded",
                "invalid:border-pink-500 invalid:text-pink-600",
                "focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
                "dark:border-slate-900"
            ) } />

            <label htmlFor="message" className="mb-2">{ t( 'message' ) } *</label>
            <textarea id="message" name="message" required className={
                clsx(
                    "text-foreground w-full p-2 mb-4 border border-gray-300 rounded min-h-44",
                    "invalid:border-pink-500 invalid:text-pink-600",
                    "focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
                    "dark:border-slate-900"
                )
            } />

            {
                successMessage && (
                    <div className="flex flex-column justify-center w-full">
                        <Alert type="tip">
                            { successMessage }
                        </Alert>
                    </div>
                )
            }

            {
                errorMessage && (
                    <div className="flex flex-column justify-center w-full">
                        <Alert type="warning">
                            { errorMessage }
                        </Alert>
                    </div>
                )
            }

            <button type="submit" disabled={ isLoading } className={
                clsx(
                    "flex items-center border border-red-700 bg-background font-bold px-4 py-2 rounded-lg mt-4 text-primary uppercase transition-colors",
                    "hover:bg-red-50",
                    "disabled:cursor-not-allowed disabled:bg-red-50 disabled:text-gray-500 disabled:border-gray-900",
                    "dark:border-slate-900 dark:hover:bg-slate-900 dark:text-white"
                )
            }>
                {
                    isLoading && <Spinner />
                }

                Submit
            </button>
        </form>
    );
}
