/**
 * Next dependencies
 */
import Head from "next/head";

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
    return (
        <>
            <Head>
                <title>
                    El Blog | Mario Aguiar
                </title>
            </Head>
            
            <div className="flex flex-col gap-10 items-center px-4 lg:max-w-screen-xl">
                <H2>
                    Blog
                </H2>

                <p className="text-center lg:max-w-screen-md">
                    Una de mis grandes pasiones es escribir y compartir conocimiento, aquí encontrarás algunos de mis artículos más recientes. Mayormente sobre desarrollo web, pero también sobre otros temas que me interesan.
                </p>

                <H2>
                    Lo más reciente…
                </H2>

                <BlogCards posts={ posts } />

                <H2>
                    Lo más interesante…
                </H2>

                <BlogCards />
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
