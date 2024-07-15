/**
 * External dependencies
 */
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

type PostItem = {
    slug: string;
    content: string;
    [key: string]: string;
};

function getPostSlugs( lang: "en" | "es" ) {
    return fs.readdirSync (getPostsDirectory( lang ) );
}

export function getPostsDirectory( lang: "en" | "es" ) {
    return join( process.cwd(), `/lib/_posts/${ lang }` );
}

export function getAllPosts(
    lang: "en" | "es"
) {
    const slugs = getPostSlugs( lang );
    const posts = slugs
        .map( ( slug ) => getPostDataBySlug( slug, lang, [ 'slug', 'title' ] ) )
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
    const { data, content } = matter( fileContents );

    const items: PostItem = {
        slug: '',
        content: '',
    };

    // Ensure only the minimal needed data is exposed
    fields.forEach( ( field ) => {
        if ( field === 'slug' ) {
            items.slug = trimmedSlug;
        }

        if ( field === 'content' ) {
            items.content = content;
        }

        if ( data[ field ] ) {
            items[ field ] = data[ field ];
        }
    } );

    return items;
}
