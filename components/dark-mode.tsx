/**
 * External dependencies
 */
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export function useDarkMode() {
    const [ isDarkMode, setIsDarkMode ] = useState(false);

    useEffect(() => {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
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
            >
                { isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" /> }
            </button>
        );
    }

    return { isDarkMode, DarkModeToggle } as const;
}
