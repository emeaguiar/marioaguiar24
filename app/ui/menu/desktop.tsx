/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import { MENU_ITEMS } from "@/app/lib/data";

export default function DesktopMenu() {
    return (
        <nav aria-label="Navegación principal" className="hidden lg:flex">
            <ul className="flex justify-between gap-18">
                { MENU_ITEMS.map( ( item, index ) => (
                    <MenuItem key={ index }>
                        <Link href={ item.href } className="hover:text-primary">
                            { item.label }
                        </Link>
                    </MenuItem>
                ) ) }
            </ul>
        </nav>
    );
}

function MenuItem( {
    children
}: {
    children: React.ReactNode;
} ) {
    return (
        <li className="font-bold uppercase">
            { children }
        </li>
    );
}
