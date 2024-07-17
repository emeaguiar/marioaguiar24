/**
 * External dependencies
 */
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import useTranslation from "next-translate/useTranslation";

/**
 * Next dependencies
 */
import Link from "next/link";

/**
 * Internal dependencies
*/
import { merriweather } from "@/components/fonts";
import { BLOG_PREFIX } from "@/lib/data";
import type { PostItem } from "@/types/post";

export default function Cards( { posts }: { [ key: string ]: any } ) {
    return (
        <div className="grid gap-8 items-center w-full lg:grid-cols-3 auto lg:max-w-screen-xl">
            {
                posts && posts.map( ( post: PostItem ) => (
                    <Card post={ post } key={ post.slug } />
                ) )
            }
        </div>
    );
}

function Card( { post }: { post: PostItem } ) {
    const { t } = useTranslation( 'common' );

    return (
        <div className="flex flex-col gap-4 rounded-2xl border p-6 dark:bg-slate-800">
            <h3 className={ `${ merriweather.className } font-bold text-xl` }>
                <Link href={ `${ BLOG_PREFIX }/${ post.slug }` }>
                    { post.title }
                </Link>
            </h3>

            <p className="line-clamp-5">
                { post.description }
            </p>

            <Link
                href={ `${ BLOG_PREFIX }/${ post.slug }` }
                className={ `${ merriweather.className } flex items-center gap-2 text-primary text-sm` }
            >
                <span>
                    { t( 'readMore' ) }
                </span>

                <ArrowRightIcon className="h-4 w-4" />
            </Link>
        </div>
    );
}
