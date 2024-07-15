/**
 * External dependencies
 */
import useTranslation from "next-translate/useTranslation";
import { NextSeo } from "next-seo";

/**
 * Internal dependencies
 */
import { H2 } from "@/components/elements";
import BlogCards from "@/components/blog/cards";
import { getPosts } from "@/lib/posts";

export const metadata = {
    title: "Blog",
};

export default function Page( {
    posts,
}: {
    posts: {
        [ key: string ]: any;
    };
} ) {
    const { t } = useTranslation( 'blog' );

    return (
        <>
            <NextSeo
                title={ t( 'title' ) }
                description={ t( 'description' ) }
            />

            <div className="flex flex-col gap-10 items-center px-4 lg:max-w-screen-xl">
                <H2>
                    { t( 'title' ) }
                </H2>

                <p className="text-center lg:max-w-screen-md">
                    { t( 'description' ) }
                </p>

                <H2>
                    { t( 'latest' ) }
                </H2>

                <BlogCards posts={ posts } />

                <H2>
                    { t( 'mostInteresting' ) }
                </H2>

                <BlogCards posts={ posts } />
            </div>
        </>
    );
}

export async function getStaticProps( { locale }: {
    locale: "es" | "en";
} ) {
    const posts = getPosts( locale, 3 );

    return {
        props: {
            posts,
        },
    };
}
