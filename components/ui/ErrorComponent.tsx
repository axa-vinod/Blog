'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorComponent({
  title = 'Something went wrong',
  message = 'We encountered an error while loading the content. Please try again.',
  onRetry,
}: ErrorComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-red-100 bg-red-50/30 dark:border-red-950/20 dark:bg-red-950/5 max-w-lg mx-auto">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
