/**
 * External dependencies
 */
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import clsx from "clsx";

export function useDarkMode() {
    const [ isDarkMode, setIsDarkMode ] = useState(false);

    useEffect(() => {
        setIsDarkMode( window.matchMedia('(prefers-color-scheme: dark)').matches );
    }, [] );

    useEffect(() => {
        if ( isDarkMode ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [ isDarkMode ] );

    const DarkModeToggle = () => {
        return (
            <button
                aria-label={ isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro' }
                onClick={ () => setIsDarkMode( ! isDarkMode ) }
                className="relative group flex items-center"
            >
                {
                    isDarkMode
                        ? <SunButton />
                        : <MoonButton />
                }
            </button>
        );
    }

    return { isDarkMode, DarkModeToggle } as const;
}

function SunButton() {
    return (
        <>
            <div className={
                clsx(
                    "absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full transform transition-transform duration-300 blur opacity-20",
                    "group-hover:scale-150"
                )
            } />

            <SunIcon className="h-6 w-6 text-yellow-600" />
        </>
    )
}

function MoonButton() {
    return (
        <>
            <div className={
                clsx(
                    "absolute -inset-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full transform transition-transform duration-300 blur opacity-20",
                    "group-hover:scale-150"
                )
            } />
            
            <MoonIcon className="h-6 w-6 text-gray-600" />
        </>
    )
}
