/**
 * Next dependencies
 */
import Link from "next/link";

const NAVIGATION_ITEMS = [
    {
        label: "Portafolio",
        href: "/",
    },
    {
        label: "Blog",
        href: "/blog",
    },
    {
        label: "Testimonios",
        href: "#testimonials",
    },
    {
        label: "Contacto",
        href: "/contact",
    },
];

export default function Navigation() {
    return (
        <nav aria-label="Navegación principal" className="hidden lg:flex">
            <ul className="flex justify-between gap-18">
                { NAVIGATION_ITEMS.map( ( item, index ) => (
                    <NavigationItem key={ index }>
                        <Link href={ item.href } className="hover:text-primary">
                            { item.label }
                        </Link>
                    </NavigationItem>
                ) ) }
            </ul>
        </nav>
    );
}

function NavigationItem( {
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
