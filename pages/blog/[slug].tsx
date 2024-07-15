/**
 * External dependencies
 */
import { useMemo } from "react";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { NextSeo } from "next-seo";

/**
 * Internal dependencies
 */
import { getPosts, getPostsDirectory } from "@/lib/posts";

export default function PostPage( {
    code,
    frontmatter,
}: {
    code: string;
    frontmatter: {
        [ key: string ]: any;
    };
} ) {
    const Component = useMemo( () => getMDXComponent( code ), [ code ] );

    return (
        <>
            <NextSeo
                title={ frontmatter.title }
                description={ frontmatter.description }
            />
            <Component />
        </>
    );
}

export async function getStaticProps( {
    params,
    locale
}: {
    params: {
        slug: string;
    };
    locale: '';
} ) {
    const postLocaleDirectory = getPostsDirectory( locale as "en" | "es" );

    const { code, frontmatter } = await bundleMDX( {
        file: `${ postLocaleDirectory }/${ params.slug }.mdx`,
    } );

    return {
        props: {
            code,
            frontmatter,
        },
    };
}

export async function getStaticPaths() {
    const spanishPosts = getPosts( 'es' );
    const englishPosts = getPosts( 'en' );

    const paths = [
        ...spanishPosts.map( ( post ) => ( { params: { slug: post.slug }, locale: 'es' } ) ),
        ...englishPosts.map( ( post ) => ( { params: { slug: post.slug }, locale: 'en' } ) ),
    ];

    return {
        paths,
        fallback: false,
    };
}
