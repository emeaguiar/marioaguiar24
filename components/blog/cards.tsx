/**
 * Next dependencies
 */
import Image from "next/image";

/**
 * Internal dependencies
*/
import { merriweather } from "@/components/fonts";
import type { PostItem } from "@/types/post";

export default function Cards( { posts }: { [ key: string ]: any } ) {
    return (
        <div className="grid gap-8 items-center w-full lg:grid-cols-3 lg:max-w-screen-xl">
            {
                posts && posts.map( ( post: PostItem ) => (
                    <Card post={ post } key={ post.slug } />
                ) )
            }
        </div>
    );
}

function Card( { post }: { post: any } ) {
    return (
        <div className="flex flex-col gap-4">
            <Image
                src="/thumbnail.jpg"
                alt="Thumbnail"
                width="700"
                height="420"
            />

            <div className="flex flex-col gap-4">
                <h3 className={ `${ merriweather.className } font-bold text-xl` }>
                    { post.title }
                </h3>

                <p>
                    { post.description }
                </p>
            </div>
        </div>
    );
}
