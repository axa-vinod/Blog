'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Post[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setIsMounted(true);
      const saved = localStorage.getItem('bookmarks');
      if (saved) {
        try {
          setBookmarks(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse bookmarks from localStorage', e);
        }
      }
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  const toggleBookmark = (post: Post) => {
    if (!isMounted) return;
    
    let updated: Post[];
    if (bookmarks.some((b) => b.id === post.id)) {
      updated = bookmarks.filter((b) => b.id !== post.id);
    } else {
      updated = [...bookmarks, post];
    }
    
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  return {
    bookmarks: isMounted ? bookmarks : [],
    toggleBookmark,
    isBookmarked,
    isReady: isMounted,
  };
}
