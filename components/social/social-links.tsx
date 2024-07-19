/**
 * External dependencies
 */
import clsx from "clsx";
import useTranslation from "next-translate/useTranslation";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import FacebookIcon from "@/components/social/icons/facebook";
import InstagramIcon from "@/components/social/icons/instagram";
import LinkedInIcon from "@/components/social/icons/linkedin";
import TwitterIcon from "@/components/social/icons/twitter";

const SOCIAL_LINKS = [
    {
        href: "https://www.facebook.com/mario.aguiar",
        icon: <FacebookIcon />,
        label: "Facebook",
    },
    {
        href: "https://x.com/emeaguiar",
        icon: <TwitterIcon />,
        label: "Twitter",
    },
    {
        href: "https://instagram.com/emeaguiar",
        icon: <InstagramIcon />,
        label: "Instagram",
    },
    {
        href: "https://www.linkedin.com/in/marioaguiar/",
        icon: <LinkedInIcon />,
        label: "Linkedin",
    },
];

export default function SocialLinks( { className }: {
    className?: string;
} ) {
    return (
        <nav
            aria-label="Navegación social"
            className={ clsx(
                "flex gap-4",
                className
            ) }
        >
            <ul className="flex justify-between gap-4">
                { SOCIAL_LINKS.map( ( { href, icon, label }, index ) => (
                    <SocialLink key={ index } href={ href } label={ label }>
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
    label,
}: {
    children: React.ReactNode;
    href: string;
    label: string;
} ) {
    const { t } = useTranslation( 'common' );

    return (
        <li>
            <Link href={ href } aria-label={ t( 'socialText', { label } ) } className="text-foreground hover:text-primary transition-colors">
                { children }
            </Link>
        </li>
    );
}
