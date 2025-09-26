/**
 * Next dependencies
 */
import Link from 'next/link';

/**
 * Internal dependencies
 */
import type { PostItem } from '@/types/post';
import { BLOG_PREFIX } from '@/lib/data';

export function List({ posts }: { posts: PostItem[] }) {
  return (
    <div
      id='blog-list'
      className='auto flex w-full flex-col gap-2 lg:max-w-screen-md'
    >
      {posts.map((post) => (
        <ListItem post={post} key={post.slug} />
      ))}
    </div>
  );
}

export function ListItem({ post }: { post: PostItem }) {
  return (
    <div className='relative flex flex-row gap-4 border-b border-gray-200 pb-4 last:border-b-0'>
      <div className='flex flex-col gap-4'>
        <time dateTime={post.publishedOn} className='text-sm text-gray-500'>
          {post.publishedOn}
        </time>
      </div>
      <h3 className=''>{post.title}</h3>
      <div className='ml-auto mr-0 flex flex-col gap-4'>
        <p className='text-sm text-gray-500'>{post.readingTime} min read</p>
      </div>
      <Link
        href={`${BLOG_PREFIX}/${post.slug}`}
        className='absolute right-0 top-0 h-full w-full'
      />
    </div>
  );
}
