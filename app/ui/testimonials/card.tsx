/**
 * Next dependencies
 */
import Image from "next/image";

/**
 * Internal dependencies
 */
import { merriweather } from "@/app/ui/fonts";

export default function Card() {
    return (
        <div className="flex flex-col gap-8 items-center px-4">
            <Image
                src="/avatar.jpg"
                alt="Thumbnail"
                width="100"
                height="100"
            />

            <blockquote className={ `${ merriweather.className } text-2xl text-center`}>
                <p className="italic">
                    “Sed molestie consectetur erat porta pretium. Donec volutpat porttitor risus a vestibulum. Donec sollicitudin lobortis diam, ac finibus nunc. Aenean.”
                </p>
            </blockquote>
        </div>
    )
}
