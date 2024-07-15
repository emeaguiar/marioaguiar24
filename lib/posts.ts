/**
 * External dependencies
 */
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

/**
 * Internal dependencies
 */
import type { PostItem } from "@/types/post";

function getPostSlugs( lang: "en" | "es" ) {
    return fs.readdirSync (getPostsDirectory( lang ) );
}

export function getPostsDirectory( lang: "en" | "es" ) {
    return join( process.cwd(), `/lib/_posts/${ lang }` );
}

export function getPosts(
    lang: "en" | "es",
    limit: number = 0
) {
    let slugs = getPostSlugs( lang );

    if ( limit > 0 ) {
        slugs = slugs.slice( 0, limit );
    }

    const posts = slugs
        .map( ( slug ) => getPostDataBySlug( slug, lang, [ 'slug', 'title', 'description' ] ) )
        .sort( ( post1, post2 ) => ( post1.date > post2.date ? -1 : 1 ) );

    return posts;    
}

function getPostDataBySlug(
    slug: string,
    lang: "en" | "es",
    fields: string[] = []
) {
    console.log( "slug", slug );
    const trimmedSlug = slug.replace( /\.mdx$/, '' );
    const fullPath = join( getPostsDirectory( lang ), `${ trimmedSlug }.mdx` );
    const fileContents = fs.readFileSync( fullPath, 'utf8' );
    const { data } = matter( fileContents );

    const items: PostItem = {
        slug: '',
        description: '',
    };

    // Ensure only the minimal needed data is exposed
    fields.forEach( ( field ) => {
        if ( field === 'slug' ) {
            items.slug = trimmedSlug;
        }

        // Generic data.
        if ( data[ field ] ) {
            items[ field ] = data[ field ];
        }
    } );

    return items;
}
