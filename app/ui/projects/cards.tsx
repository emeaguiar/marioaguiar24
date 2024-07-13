/**
 * Next dependencies
 */
import Image from "next/image";

export default function Cards() {
    return (
        <div className="flex flex-col gap-8 items-center w-full">
            <Card />
            <Card />
            <Card />
        </div>
    );
}

function Card() {
    return (
        <div className="flex">
            <Image
                src="/projects-thumbnail.jpg"
                alt="Thumbnail"
                width="390"
                height="488"
            />
        </div>
    )
}