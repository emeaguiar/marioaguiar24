/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * Next dependencies
 */
import Image from "next/image";

export default function Cards() {
    return (
        <div className="grid gap-8 items-center w-full lg:grid-cols-3 lg:max-w-screen-xl">
            <CardsRow />
            <CardsRow inverted />
        </div>
    );
}

function CardsRow( {
    inverted
}: {
    inverted?: boolean;
} ) {
    return (
        <>
            { ! inverted && (
                <>
                    <div className="h-full lg:overflow-hidden">
                        <Card />
                    </div>

                    <div className="h-full lg:col-span-2 lg:overflow-hidden">
                        <Card className="aspect-video" />
                    </div>
                </>
            ) }

            { inverted && (
                <>
                    <div className="h-full lg:col-span-2 lg:overflow-hidden">
                        <Card className="aspect-video" />
                    </div>

                    <div className="h-full lg:overflow-hidden">
                        <Card />
                    </div>
                </>
            ) }
        </>
    )
}

function Card( {
    className,
}: {
    className?: string;
} ) {
    // @TODO: Fix aspect ratio and colum span
    return (
        <div className={ clsx(
            'flex aspect-project-closed h-full',
            className || '',
        ) }>
            <Image
                src="/thumbnail.jpg"
                alt="Thumbnail"
                width="700"
                height="420"
                className="w-full object-cover"
            />
        </div>
    )
}