/**
 * External dependencies
 */
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

/**
 * Next.js dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
 */
import { merriweather } from "@/components/fonts";

export function H1( {
    children,
    className,
    id,
}: {
    children?: React.ReactNode;
    className?: string;
    id?: string;
} ) {
    return (
        <h1
            className={ clsx(
                `${ merriweather.className } font-bold text-3xl/10 my-16 lg:max-w-screen-sm lg:mb-20 lg:mt-12 lg:text-4xl/normal lg:text-center`,
                className,
            ) }
            id={ id }
        >
            { children }
        </h1>
    );
}

export function H2( {
    children,
    className,
    id,
}: {
    children?: React.ReactNode;
    className?: string;
    id?: string;
} ) {
    return (
        <h2
            className={ clsx(
                `${ merriweather.className } font-bold text-2xl`,
                className,
            ) }
            id={ id }
        >
            { children }
        </h2>
    );
}

export function WithUnderline( { children }: {
    children?: React.ReactNode;
} ) {
    return (
        <span className="relative isolate">
            <span className="absolute bottom-1 left-0 w-full h-1 bg-underline opacity-80 lg:h-2" />

            <span className="relative z-10">
                { children }
            </span>
        </span>
    );
}

export function P( { children }: {
    children?: React.ReactNode
} ) {
    return <p className="max-w-screen-sm">{ children }</p>
};

export function A( { children, href }: any ) {
    const isExternal = href.startsWith( "http" );

    return (
        <Link
            className={ clsx( 'text-primary hover:underline', {
                'inline-flex items-center': isExternal,
            } ) }
            href={ href }
            passHref={ isExternal }
        >
            { children }

            { isExternal && (
                <ArrowTopRightOnSquareIcon aria-hidden className="w-5 h-5 inline-flex ml-1" />
            ) }
        </Link>
    );
}
