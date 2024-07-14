/**
 * External dependencies
 */
import { XMarkIcon } from "@heroicons/react/24/solid";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import { MENU_ITEMS } from "@/app/lib/data";

export default function MobileMenu() {
    return (
        <div className="absolute inset-0 bg-background z-10 lg:hidden">
            <button className="absolute top-0 right-0 p-4">
                <XMarkIcon className="h-6 w-6" />
            </button>
            
            <nav aria-label="Menú Principal" className="flex flex-col gap-4">
                <ul className="flex flex-col gap-4 py-2 w-full">
                    { MENU_ITEMS.map( ( item, index ) => (
                        <MenuItem key={ index } href={ item.href }>
                            { item.label }
                        </MenuItem>
                    ) ) }
                </ul>
            </nav>
        </div>        
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
