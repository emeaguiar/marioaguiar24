/**
 * External dependencies
 */
import type { FormEvent } from "react";
import { useState } from "react";
import clsx from "clsx";

/**
 * Internal dependencies
 */
import { Spinner } from "@/components/icons";
import Alert from "@/components/alerts";

export default function ContactForm()  {
    const [ isLoading, setIsLoading ] = useState( false );
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

            setSuccessMessage( "Message sent! I'll be in touch soon." );
            setIsLoading( false );

            form.reset();
        } catch ( error: unknown ) {
            console.error( error );
            setErrorMessage( 'Error sending message. Please try again later.' );
            setIsLoading( false );
        }
    }

    return (
        <form
            className="flex flex-col items-start mt-8 w-full"
            onSubmit={ handleOnSubmit }
        >
            <label htmlFor="name" className="mb-2">Name *</label>
            <input type="text" id="name" name="name" required className={ clsx(
                "text-foreground w-full p-2 mb-4 border border-gray-300 rounded",
                "invalid:border-pink-500 invalid:text-pink-600",
                "focus:invalid:border-pink-500 focus:invalid:ring-pink-500",
            ) } />

            <label htmlFor="email" className="mb-2">Email *</label>
            <input type="email" id="email" name="email" required className={ clsx(
                "text-foreground w-full p-2 mb-4 border border-gray-300 rounded",
                "invalid:border-pink-500 invalid:text-pink-600",
                "focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            ) } />

            <label htmlFor="message" className="mb-2">Message *</label>
            <textarea id="message" name="message" required className={
                clsx(
                    "text-foreground w-full p-2 mb-4 border border-gray-300 rounded min-h-44",
                    "invalid:border-pink-500 invalid:text-pink-600",
                    "focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
                    "disabled:cursor-not-allowed disabled:bg-red-50 disabled:text-gray-500 disabled:border-gray-900"
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
