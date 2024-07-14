/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * Internal dependencies
 */
import { longCang } from "@/app/ui/fonts";

export default function Logo( {
    className,
    inverted,
}: {
    className?: string;
    inverted?: boolean;
} ) {
    return (
        <div className={ clsx(
            longCang.className,
            {
                "text-white": inverted,
            }
        ) }>
            <h2 className={ className }>
                Mario Aguiar.
            </h2>
        </div>
    );
}
