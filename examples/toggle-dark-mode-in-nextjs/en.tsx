/**
 * External dependencies
 */
import { useState } from "react";
import { SunIcon } from "@heroicons/react/24/outline";

export function LightExample() {
    return (
        <main>
            <div className="flex flex-col items-center p-8 bg-yellow-100 text-slate-900">
                <h1 className="text-4xl font-bold text-red-700">Hello, world!</h1>
                <p className="text-lg mt-4">Welcome to my website!</p>
            </div>
        </main>
    );
};

export function DarkExample() {
    return (
        <main>
            <div className="flex flex-col items-center p-8 bg-orange-950 text-yellow-50">
                <h1 className="text-4xl font-bold text-red-200">Hello, world!</h1>
                <p className="text-lg mt-4">Welcome to my website!</p>
            </div>
        </main>
    )
}

export function SunButtonExample() {
    return (
        <button aria-label="Switch to dark mode" className="bg-yellow-800 text-yellow-50 rounded-full p-2 w-min">
            <SunIcon className="w-6 h-6" />
        </button>
    );
}

export function SunButtonDarkExample() {
    return (
        <button aria-label="Switch to dark mode" className="bg-yellow-100 text-slate-900 rounded-full p-2 w-min">
            <SunIcon className="w-6 h-6" />
        </button>
    );
}

export function ComponentWithButton() {
    return (
        <main>
            <div className="flex flex-col items-center p-4 bg-yellow-100 dark:bg-orange-950 text-slate-900 dark:text-yellow-50">
                <div className="flex justify-end w-full">
                    <button
                        aria-label="Switch to dark mode" className="bg-yellow-800 text-yellow-50 dark:bg-yellow-100 dark:text-slate-900 rounded-full p-2 w-min">
                        <SunIcon className="w-6 h-6" />
                    </button>
                </div>

                <h1 className="text-4xl font-bold mt-8 text-red-700 dark:text-red-200">Hello, world!</h1>
                <p className="text-lg mt-4">Welcome to my website!</p>
            </div>
        </main>
    );
}

export function Component() {
    const [ isDarkModeActivated, setIsDarkModeActivated ] = useState( false );

    const toggleDarkMode = () => {
        setIsDarkModeActivated( !isDarkModeActivated );
    };

    return (
        <main className={ isDarkModeActivated ? 'dark' : 'light' }>
            <div className="flex flex-col items-center p-4 bg-yellow-100 dark:bg-orange-950 text-slate-900 dark:text-yellow-50">
                <div className="flex justify-end w-full">
                    <button
                        aria-label="Switch to dark mode"
                        className="bg-yellow-800 text-yellow-50 dark:bg-yellow-100 dark:text-slate-900 rounded-full p-2 w-min"
                        onClick={ toggleDarkMode }
                    >
                        <SunIcon className="w-6 h-6" />
                    </button>
                </div>

                <h1 className="text-4xl font-bold mt-8 text-red-700 dark:text-red-200">Hello, world!</h1>
                <p className="text-lg mt-4">Welcome to my website!</p>
            </div>
        </main>
    );
}
