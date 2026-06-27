'use client';

import React from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Post } from '@/types';

interface BookmarkButtonProps {
  post: Post;
  className?: string;
}

export function BookmarkButton({ post, className = '' }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, isReady } = useBookmarks();

  if (!isReady) {
    return (
      <div className={`h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse ${className}`} />
    );
  }

  const bookmarked = isBookmarked(post.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(post);
      }}
      aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark post'}
      className={`p-2 rounded-full transition-all duration-200 border ${
        bookmarked
          ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/50 dark:border-indigo-900 dark:text-indigo-400'
          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:text-slate-200 dark:hover:border-slate-700'
      } ${className}`}
    >
      <Bookmark className={`h-4.5 w-4.5 ${bookmarked ? 'fill-current' : ''}`} />
    </button>
  );
}
