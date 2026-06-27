'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';
import { CategoryBadge } from './CategoryBadge';
import { BookmarkButton } from './BookmarkButton';
import { formatDate } from '@/utils/helpers';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col items-start justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700/80 dark:hover:shadow-indigo-500/5 dark:hover:shadow-2xl">
      {/* Cover Image */}
      <div className="relative w-full aspect-16/10 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <Link href={`/blog/${post.id}`} aria-label={`Read article: ${post.title}`}>
          <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-3 left-3">
          <CategoryBadge category={post.category} />
        </div>
        <div className="absolute top-3 right-3">
          <BookmarkButton post={post} />
        </div>
      </div>

      {/* Meta info */}
      <div className="mt-4 flex items-center gap-x-4 text-xs">
        <time dateTime={post.createdAt} className="text-slate-500 dark:text-slate-400">
          {formatDate(post.createdAt)}
        </time>
        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
      </div>

      {/* Title & Excerpt */}
      <div className="group relative max-w-xl">
        <h3 className="mt-3 text-lg font-bold leading-6 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <Link href={`/blog/${post.id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
          {post.description}
        </p>
      </div>

      {/* Author and Read More footer */}
      <div className="relative mt-6 flex w-full items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4">
        <div className="flex items-center gap-x-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-200 dark:border-slate-800">
            <Image
              src={post.authorImage}
              alt={`Avatar of ${post.author}`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-slate-900 dark:text-white">{post.author}</p>
          </div>
        </div>
        
        <Link 
          href={`/blog/${post.id}`} 
          className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 group/link"
          aria-hidden="true"
        >
          <span>Read</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
