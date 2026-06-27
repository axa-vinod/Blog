'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePosts } from '@/hooks/usePosts';
import { useBookmarks } from '@/hooks/useBookmarks';
import { FeaturedPost } from './FeaturedPost';
import { BlogCard } from './BlogCard';
import { SearchBar } from './SearchBar';
import { Pagination } from './Pagination';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorComponent } from './ErrorComponent';

import { ScrollToTop } from './ScrollToTop';
import { Post } from '@/types';
import { Star, Sparkles, FolderOpen, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function BlogHome() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL search params
  const categoryParam = searchParams.get('category') || 'All';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const searchParam = searchParams.get('search') || '';
  const bookmarksOnly = searchParams.get('bookmarks') === 'true';

  // Search input state (with debouncing for the API request)
  const [searchInput, setSearchInput] = useState(searchParam);
  const [debouncedSearch, setDebouncedSearch] = useState(searchParam);

  // Sync search input with URL searchParam
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setSearchInput(searchParam);
      setDebouncedSearch(searchParam);
    });
    return () => cancelAnimationFrame(handle);
  }, [searchParam]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
      
      // Update URL with search term, resetting to page 1
      const params = new URLSearchParams(window.location.search);
      if (searchInput) {
        params.set('search', searchInput);
      } else {
        params.delete('search');
      }
      params.set('page', '1');
      router.push(`/?${params.toString()}`);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput, router]);

  // Fetch posts from API (uses TanStack Query)
  const { data, isLoading, isError, refetch } = usePosts({
    category: categoryParam !== 'All' ? categoryParam : undefined,
    search: debouncedSearch || undefined,
    page: pageParam,
    limit: 6, // 6 posts per page
  });

  // Fetch popular posts for sidebar (based on views)
  const { data: popularData } = usePosts({
    limit: 3,
    sortBy: 'views',
  });

  const { bookmarks, isReady: bookmarksReady } = useBookmarks();

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(window.location.search);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.delete('bookmarks'); // Turn off bookmarks view when filtering category
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(page));
    router.push(`/?${params.toString()}`);
  };

  const handleClearAllFilters = () => {
    setSearchInput('');
    router.push('/');
  };

  // Resolve which posts to show (normal grid or bookmark list)
  let displayedPosts: Post[] = data?.posts || [];
  let totalPages = data?.pagination?.totalPages || 1;
  let currentPage = data?.pagination?.page || 1;

  if (bookmarksOnly && bookmarksReady) {
    // Filter bookmarks list locally if search/category is set
    displayedPosts = bookmarks;
    if (categoryParam !== 'All') {
      displayedPosts = displayedPosts.filter(
        (b) => b.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }
    if (debouncedSearch) {
      displayedPosts = displayedPosts.filter(
        (b) =>
          b.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          b.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          b.author.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    totalPages = 1; // Simplify pagination for bookmarks
    currentPage = 1;
  }

  // Get the featured hero post (takes the first featured post in the list, or the very first post)
  // Only show Hero section on the first page when not filtering by search or bookmarks
  const showHero = pageParam === 1 && !debouncedSearch && !bookmarksOnly && categoryParam === 'All';
  const heroPost = data?.posts?.find((p) => p.featured) || data?.posts?.[0];
  const gridPosts = showHero 
    ? displayedPosts.filter((p) => p.id !== heroPost?.id) 
    : displayedPosts;

  const categories = ['All', 'Development', 'Design', 'Technology', 'Productivity'];

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      {showHero && heroPost && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <FeaturedPost post={heroPost} />
        </div>
      )}

      {/* 2. Controls (Search & Category Selector) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <SearchBar value={searchInput} onChange={setSearchInput} />
        
        {/* Categories Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const isSelected = bookmarksOnly ? false : categoryParam === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-950 shadow'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Grid + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Blog Post List (Left Column) */}
        <main className="lg:col-span-8 space-y-10">
          {bookmarksOnly && (
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
              <Star className="h-5 w-5 fill-current" />
              <span>Viewing Bookmarked Articles ({displayedPosts.length})</span>
            </div>
          )}

          {isLoading ? (
            <LoadingSkeleton type="grid" count={3} />
          ) : isError ? (
            <ErrorComponent onRetry={refetch} />
          ) : gridPosts.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/10">
              <FolderOpen className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white">No results found</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                We couldn&apos;t find any articles matching your criteria. Try adjusting your search term or filter.
              </p>
              <button
                onClick={handleClearAllFilters}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Grid of posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {!bookmarksOnly && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
        </main>

        {/* Sidebar (Right Column) */}
        <aside className="lg:col-span-4 space-y-10">
          
          {/* Popular Posts */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Popular Posts</h3>
            </div>
            
            <div className="mt-4 space-y-4">
              {popularData?.posts?.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex gap-4 group items-center py-2 border-b border-slate-50 dark:border-slate-900 last:border-b-0"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {post.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-0.5">
                        <Eye className="h-3 w-3" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>


        </aside>
      </div>

      <ScrollToTop />
    </div>
  );
}
