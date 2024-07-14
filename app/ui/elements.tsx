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
            className={ `${ merriweather.className } font-bold text-2xl ${ className }` }
            id={ id }
        >
            { children }
        </h2>
    );
}
