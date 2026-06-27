'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 px-4 py-16 transition-colors duration-200">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-500">
            <AlertTriangle className="h-7 w-7" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Article Not Found
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              The blog article you are looking for does not exist, has been removed, or is temporarily unavailable.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="h-4.5 w-4.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
