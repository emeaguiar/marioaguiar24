"use client";

/**
 * External dependencies
 */
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useState } from "react";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import { MENU_ITEMS } from "@/lib/data";

export default function MobileMenu() {
    const [ isOpen, setIsOpen ] = useState( false );

    return (
        <>
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
                        { MENU_ITEMS.map( ( item, index ) => (
                            <MenuItem key={ index } href={ item.href }>
                                { item.label }
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
            <Link href={ href } className="block font-bold px-4 py-2 uppercase">
                { children }
            </Link>
        </li>
    );
}
