/**
 * External dependencies
 */
import useTranslation from "next-translate/useTranslation";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import { MENU_ITEMS } from "@/lib/data";

export default function DesktopMenu() {
    const { t } = useTranslation( 'common' );

    return (
        <nav aria-label="Navegación principal" className="hidden lg:flex">
            <ul className="flex items-center justify-between gap-18">
                { MENU_ITEMS.map( ( { href, key }, index ) => (
                    <MenuItem key={ index }>
                        <Link href={ href } className="hover:text-primary transition-colors">
                            { t( key ) }
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
