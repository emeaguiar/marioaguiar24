/**
 * External dependencies
 */
import type { FormEvent } from "react";
import { useState } from "react";

export default function ContactForm()  {
    const [ isLoading, setIsLoading ] = useState( false );
    const [ succesMessage, setSuccesMessage ] = useState( '' );

    const handleOnSubmit = async ( event: FormEvent ) => {
        event.preventDefault();

        if ( isLoading ) {
            return;
        }

        setIsLoading( true );

        const form = event.target as HTMLFormElement;
        const formValues = Object.fromEntries( new FormData( form ).entries() );

        setIsLoading( true );
        setSuccesMessage( '' );

        try {
            const response = await fetch( '/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( formValues ),
            } );

            if ( ! response.ok ) {
                throw new Error( `HTTP error Status: ${response.status}` );
            }

            setSuccesMessage( 'Message sent!' );
            setIsLoading( false );

            form.reset();
        } catch ( error: unknown ) {
            console.error( error );
            setSuccesMessage( 'Error sending message. Please try again later.' );
            setIsLoading( false );
        }
    }

    return (
        <form
            className="flex flex-col items-start mt-8 w-full"
            onSubmit={ handleOnSubmit }
        >
            <label htmlFor="name" className="mb-2">Name</label>
            <input type="text" id="name" name="name" className="text-foreground w-full p-2 mb-4 border border-gray-300 rounded" />

            <label htmlFor="email" className="mb-2">Email</label>
            <input type="email" id="email" name="email" className="text-foreground w-full p-2 mb-4 border border-gray-300 rounded" />

            <label htmlFor="message" className="mb-2">Message</label>
            <textarea id="message" name="message" className="text-foreground w-full p-2 mb-4 border border-gray-300 rounded" />

            <button type="submit" className="bg-background font-bold px-4 py-2 rounded-lg mt-4 text-primary uppercase">
                Submit
            </button>
        </form>
    );
}
