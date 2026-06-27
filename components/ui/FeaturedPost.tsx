'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types';
import { CategoryBadge } from './CategoryBadge';
import { BookmarkButton } from './BookmarkButton';
import { formatDate } from '@/utils/helpers';
import { Clock, ArrowRight } from 'lucide-react';

interface FeaturedPostProps {
  post: Post;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Large Image */}
        <div className="relative aspect-16/10 lg:aspect-auto min-h-[300px] lg:min-h-[480px] bg-slate-100 dark:bg-slate-800">
          <Image
            src={post.coverImage}
            alt={`Cover image for featured post: ${post.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-101"
          />
          <div className="absolute top-4 left-4">
            <CategoryBadge category={post.category} size="md" />
          </div>
          <div className="absolute top-4 right-4 z-10">
            <BookmarkButton post={post} />
          </div>
        </div>

        {/* Right Column - Text Details */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          {/* Tagline */}
          <div className="flex items-center gap-4 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            <span>Featured Article</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="flex items-center gap-1 normal-case text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <Link href={`/blog/${post.id}`}>
              {post.title}
            </Link>
          </h2>

          {/* Description */}
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {post.description}
          </p>

          {/* Tags list */}
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Details and Link */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 dark:border-slate-800">
                <Image
                  src={post.authorImage}
                  alt={`Avatar of ${post.author}`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{post.author}</p>
                <time dateTime={post.createdAt} className="text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(post.createdAt)}
                </time>
              </div>
            </div>

            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 transition-all dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-500 dark:hover:text-white group/btn"
            >
              <span>Read Article</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
