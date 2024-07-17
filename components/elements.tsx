/**
 * External dependencies
 */
import clsx from "clsx";

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
