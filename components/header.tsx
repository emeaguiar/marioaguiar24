/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import Logo from "@/components/logo";
import MobileMenu from "@/components/menu/mobile";
import DesktopMenu from "@/components/menu/desktop";

export default function Header() {
    return (
        <div className="flex justify-between w-full p-4 max-w-screen-xl">
            <Link href="/" className="hover:text-primary">
                <Logo />
            </Link>

            <DesktopMenu />

            <MobileMenu />
        </div>
    )
}
