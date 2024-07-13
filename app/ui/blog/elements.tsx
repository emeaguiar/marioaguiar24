/**
 * Internal dependencies
 */
import { merriweather } from "@/app/ui/fonts";

export function H2( { children }: {
    children: React.ReactNode;
} ) {
    return (
        <h2 className={ `${ merriweather.className } font-bold text-2xl` }>
            { children }
        </h2>
    );
}
