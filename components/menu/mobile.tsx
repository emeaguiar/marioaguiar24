"use client";

/**
 * External dependencies
 */
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import { MENU_ITEMS } from "@/lib/data";
import DarkModeToggle from "@/components/dark-mode-toggle";

export default function MobileMenu() {
    const [ isOpen, setIsOpen ] = useState( false );
    const { t } = useTranslation( 'common' );

    return (
        <>
            <DarkModeToggle className="ml-auto mr-8 lg:hidden" />

            <button
                className="lg:hidden"
                onClick={ () => setIsOpen( true ) }
            >  
                <Bars3Icon className="h-6 w-6" />
            </button>

            <div className={
                clsx(
                    "fixed inset-0 bg-background z-10 transition-transform -translate-y-full lg:hidden",
                    {
                        "translate-y-0": isOpen,
                    }
                )
            }>
                <button
                    className="absolute top-1 right-0 p-4"
                    onClick={ () => setIsOpen( false ) }
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <nav aria-label="Menú Principal" className="flex flex-col gap-4">
                    <ul className="flex flex-col gap-4 py-3 w-full">
                        { MENU_ITEMS.map( ( { href, key }, index ) => (
                            <MenuItem key={ index } href={ href }>
                                { t( key ) }
                            </MenuItem>
                        ) ) }
                    </ul>
                </nav>
            </div>
        </>      
    );
}

function MenuItem( {
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
} ) {
    return (
        <li>
            <Link href={ href } className="block font-bold px-4 py-2 uppercase transition-colors">
                { children }
            </Link>
        </li>
    );
}
