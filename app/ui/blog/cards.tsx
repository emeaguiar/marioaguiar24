/**
 * Next dependencies
 */
import Image from "next/image";

/**
 * Internal dependencies
 */
import { merriweather } from "@/app/ui/fonts";

export default function Cards() {
    return (
        <div className="grid gap-8 items-center w-full lg:grid-cols-3 lg:max-w-screen-xl">
            <Card />
            <Card />
            <Card />
        </div>
    );
}

function Card() {
    return (
        <div className="flex flex-col gap-4">
            <Image
                src="/thumbnail.jpg"
                alt="Thumbnail"
                width="700"
                height="420"
                sizes="(max-width: 1280px) 100vw, 33vw"
            />

            <div className="flex flex-col gap-4">
                <h3 className={ `${ merriweather.className } font-bold text-xl` }>
                    Phasellus sed metus blandit, suscipit metus eu, rhoncus.
                </h3>

                <p>
                    Pellentesque eu elit a dolor eleifend molestie. Integer eget turpis laoreet, convallis.
                </p>
            </div>
        </div>
    );
}
