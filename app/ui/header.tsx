/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import Logo from "@/app/ui/logo";
import MobileMenu from "@/app/ui/menu/mobile";
import DesktopMenu from "@/app/ui/menu/desktop";

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
