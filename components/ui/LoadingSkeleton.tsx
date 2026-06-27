import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'hero' | 'grid' | 'detail';
  count?: number;
}

function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/40 animate-pulse">
      {/* Cover Image Placeholder */}
      <div className="w-full aspect-16/10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      
      {/* Date & Read time */}
      <div className="mt-4 flex gap-4">
        <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Title */}
      <div className="mt-3 space-y-2">
        <div className="h-4.5 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-4.5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Excerpt */}
      <div className="mt-3 space-y-1.5">
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Author Details footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800" />
          <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-3 w-12 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

function HeroSkeleton() {
  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40 p-6 sm:p-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-16/10 lg:aspect-auto min-h-[300px] lg:min-h-[400px] rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="flex flex-col justify-center space-y-4">
          <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-full rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-1.5">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-2 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
            <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Breadcrumb / Category */}
      <div className="h-4.5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
      
      {/* Title */}
      <div className="space-y-3">
        <div className="h-10 sm:h-12 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-10 sm:h-12 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>

      {/* Author and stats meta */}
      <div className="flex items-center gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-2.5 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
      </div>

      {/* Cover Image */}
      <div className="w-full aspect-21/9 rounded-3xl bg-slate-200 dark:bg-slate-800" />

      {/* Paragraphs */}
      <div className="space-y-4 pt-4">
        <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3.5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3.5 w-11/12 bg-slate-200 dark:bg-slate-800 rounded" />
        
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded pt-4" />
        <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

export function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  if (type === 'hero') return <HeroSkeleton />;
  if (type === 'detail') return <DetailSkeleton />;

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return <CardSkeleton />;
}
