/**
 * Internal dependencies
 */
import { merriweather } from "@/app/ui/fonts";

export function H2( {
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
} ) {
    return (
        <h2 className={ `${ merriweather.className } font-bold text-2xl ${ className }` }>
            { children }
        </h2>
    );
}
