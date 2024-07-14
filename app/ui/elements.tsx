/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * Internal dependencies
 */
import { merriweather } from "@/app/ui/fonts";

export function H2( {
    children,
    className,
    id,
}: {
    children: React.ReactNode;
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

export function WithUnderline( {
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
} ) {
    return (
        <span className="relative isolate">
            <span className="absolute bottom-1 left-0 w-full h-1 bg-secondary opacity-80 lg:h-2" />

            <span className="relative z-10">
                { children }
            </span>
        </span>
    );
}
