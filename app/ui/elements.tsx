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
