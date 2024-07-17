/**
 * External dependencies
 */
import clsx from "clsx";

export default function AlignWide( { children, className }: {
    children: React.ReactNode,
    className?: string;
} ) {
    return (
        <div className={
            clsx(
                'lg:-mx-8 lg:max-w-screen-md',
                className,
            )
        }>
            { children }
        </div>
    );
}
