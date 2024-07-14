/**
 * External dependencies
 */
import { Bars3Icon } from "@heroicons/react/24/solid";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import Logo from "@/app/ui/logo";
import Navigation from "@/app/ui/navigation";

export default function Header() {
    return (
        <div className="flex justify-between w-full p-4 max-w-screen-xl">
            <Link href="/" className="hover:text-primary">
                <Logo />
            </Link>

            <button className="lg:hidden">  
                <Bars3Icon className="h-6 w-6" />
            </button>

            <Navigation />
        </div>
    )
}
