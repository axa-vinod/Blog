import React, { Suspense } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getPostsServer } from '@/lib/posts-server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BlogHome } from '@/components/ui/BlogHome';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const category = (resolvedSearchParams.category as string) || undefined;
  const search = (resolvedSearchParams.search as string) || undefined;
  const page = parseInt((resolvedSearchParams.page as string) || '1', 10);

  const queryClient = new QueryClient();

  // Prefetch main posts grid using direct server call (bypass network)
  const postsParams = {
    category: category !== 'All' ? category : undefined,
    search: search || undefined,
    page,
    limit: 6,
  };
  await queryClient.prefetchQuery({
    queryKey: ['posts', postsParams],
    queryFn: () => getPostsServer(postsParams),
  });

  // Prefetch sidebar popular posts using direct server call (bypass network)
  const popularParams = {
    limit: 3,
    sortBy: 'views',
  };
  await queryClient.prefetchQuery({
    queryKey: ['posts', popularParams],
    queryFn: () => getPostsServer(popularParams),
  });

  return (
    <>
      <Navbar />
      <div className="flex-1 w-full bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<LoadingSkeleton type="hero" />}>
              <BlogHome />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
      <Footer />
    </>
  );
}
