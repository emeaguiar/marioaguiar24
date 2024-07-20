/**
 * External dependencies
 */
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import clsx from "clsx";
import { useTheme } from "next-themes";

export default function DarkModeToggle( { className }: {
    className?: string;
} ) {
    const [ isMounted, setIsMounted ] = useState( false );
    const { setTheme, theme } = useTheme();
    const isDarkMode = theme === 'dark';

    useEffect( () => {
        setIsMounted( true );
    }, [] );

    return (
        <button
            aria-label={ isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro' }
            onClick={ () => setTheme( isDarkMode ? 'light' : 'dark' ) }
            className={
                clsx(
                    'relative group flex items-center',
                    className
                )
            }
        >
            {
                ! isMounted && (
                    <div className={
                        clsx(
                            "absolute -inset-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full transform transition-transform duration-300 blur opacity-20",
                            "group-hover:scale-150"
                        )
                    } />
                )
            }

            {
                isDarkMode
                    ? <SunButton />
                    : <MoonButton />
            }
        </button>
    );
}

function SunButton() {
    return (
        <>
            <div className={
                clsx(
                    "absolute -inset-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full transform transition-transform duration-300 blur animate-glow",
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
                    "absolute -inset-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-full transform transition-transform duration-300 blur animate-glow",
                )
            } />
            
            <MoonIcon className="h-6 w-6 text-gray-600" />
        </>
    )
}
