/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * Internal dependencies
 */
import { longCang } from "@/app/ui/fonts";

export default function Logo( {
    inverted,
}: {
    inverted?: boolean;
} ) {
    return (
        <div className={ clsx(
            longCang.className,
            'hover:text-primary',
            {
                "text-white": inverted,
                "hover:text-black": inverted,
            }
        ) }>
            <h2 className="text-3xl">
                Mario Aguiar.
            </h2>
        </div>
    );
}
