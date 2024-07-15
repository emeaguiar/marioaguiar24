/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * Internal dependencies
 */
import { longCang } from "@/components/fonts";

export default function Logo( {
    inverted,
}: {
    inverted?: boolean;
} ) {
    return (
        <div className={ longCang.className }>
            <h2 className="text-3xl">
                Mario Aguiar.
            </h2>
        </div>
    );
}
