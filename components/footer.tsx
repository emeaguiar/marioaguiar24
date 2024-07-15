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
        <footer className="bg-primary flex flex-col mt-6 gap-10 items-center p-8 w-full lg:gap-20 lg:mt-20">
            <SocialLinks />

            <Link href="/" className="text-white hover:text-black">
                <Logo inverted={ true } />
            </Link>
        </footer>
    )
}