/**
 * External dependencies
 */
import clsx from "clsx";

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

const SOCIAL_LINKS = [
    {
        href: "https://www.facebook.com/mario.aguiar",
        icon: <FacebookIcon />,
    },
    {
        href: "https://x.com/emeaguiar",
        icon: <TwitterIcon />,
    },
    {
        href: "https://instagram.com/emeaguiar",
        icon: <InstagramIcon />,
    },
    {
        href: "https://www.linkedin.com/in/marioaguiar/",
        icon: <LinkedInIcon />,
    },
];

export default function SocialLinks() {
    return (
        <nav aria-label="Navegación social" className="flex gap-4">
            <ul className="flex justify-between gap-4">
                { SOCIAL_LINKS.map( ( { href, icon }, index ) => (
                    <SocialLink key={ index } href={ href }>
                        { icon }
                    </SocialLink>
                ) ) }
            </ul>
        </nav>
    );
}

export function SocialLink( {
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
} ) {
    return (
        <li>
            <Link href={ href } className="text-white hover:text-black">
                { children }
            </Link>
        </li>
    );
}
