/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import FacebookIcon from "@/app/ui/social/icons/facebook";
import InstagramIcon from "@/app/ui/social/icons/instagram";
import LinkedInIcon from "@/app/ui/social/icons/linkedin";
import TwitterIcon from "@/app/ui/social/icons/twitter";

export default function SocialLinks() {
    return (
        <nav aria-label="Navegación social" className="flex gap-4">
            <ul className="flex justify-between gap-4">
                <li>
                    <Link href="https://www.facebook.com/mario.aguiar" className="text-white">
                        <FacebookIcon />
                    </Link>
                </li>
                <li>
                    <Link href="https://x.com/emeaguiar" className="text-white">
                        <TwitterIcon />
                    </Link>
                </li>
                <li>
                    <Link href="https://instagram.com/emeaguiar" className="text-white">
                        <InstagramIcon />
                    </Link>
                </li>
                <li>
                    <Link href="https://www.linkedin.com/in/marioaguiar/" className="text-white">
                        <LinkedInIcon />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
