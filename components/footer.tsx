/**
 * External dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import Logo from "@/components/logo";
import SocialLinks from "@/components/social/social-links";

export default function Footer() {
    return (
        <footer className="flex flex-col mt-6 gap-10 items-center p-8 w-full lg:gap-10 lg:mt-20 dark:bg-transparent">
            <SocialLinks />

            <Link href="/" className="text-foreground hover:text-primary dark:hover:text-sky-300">
                <Logo />
            </Link>
        </footer>
    )
}