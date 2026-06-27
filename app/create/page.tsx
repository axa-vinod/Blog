'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { axiosInstance } from '@/lib/axios';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { 
  FileText, Tag, Image as ImageIcon, Heading, AlignLeft, 
  Loader2, CheckCircle2, ArrowLeft, ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

export default function CreateArticlePage() {
  const router = useRouter();
  const { isLoggedIn, isReady } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isReady && !isLoggedIn) {
      router.replace('/login?redirect=/create');
    }
  }, [isLoggedIn, isReady, router]);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Default images for category choice to make it look premium out of the box
  const categoryImages: Record<string, string> = {
    Technology: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    Development: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    Design: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    Productivity: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    // Auto-suggest premium Unsplash image based on category if coverImage is empty
    if (!coverImage || Object.values(categoryImages).includes(coverImage)) {
      setCoverImage(categoryImages[cat]);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !category) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMsg('');

    // Format tags array from comma-separated input
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    try {
      // Retrieve author name dynamically from userEmail in localStorage
      let authorName = 'Administrator';
      if (typeof window !== 'undefined') {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
          const prefix = savedEmail.split('@')[0];
          if (prefix) {
            authorName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
          }
        }
      }

      await axiosInstance.post('/api/posts', {
        title,
        description: description || title.slice(0, 120) + '...',
        content,
        category,
        coverImage,
        author: authorName,
        tags,
      });

      setSubmitStatus('success');
      setIsSubmitting(false);

      // Redirect home after brief delay
      setTimeout(() => {
        router.push('/');
      }, 1500);

    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setIsSubmitting(false);
      setSubmitStatus('error');
      setErrorMsg(error.response?.data?.error || 'Failed to submit article. Please check input parameters.');
    }
  };

  if (!isReady || !isLoggedIn) {
    return (
      <>
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 min-h-[400px]">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-slate-50/50 dark:bg-slate-950 py-12 px-4 transition-colors duration-200">
        <div className="mx-auto max-w-3xl">
          
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Feed</span>
          </Link>

          {/* Page Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900/40">
            
            {submitStatus === 'success' ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Article Published!</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your new tech article has been created successfully. Redirecting to feed...
                </p>
              </div>
            ) : (
              <>
                <div className="border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                    <FileText className="h-7 w-7 text-indigo-600" />
                    <span>Create New Article</span>
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Write and share technical posts, UI design manuals, or workflow shortcuts.
                  </p>
                </div>

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 rounded-xl border border-rose-100 bg-rose-50/40 text-rose-600 dark:border-rose-950/20 dark:bg-rose-950/5 dark:text-rose-400 text-sm">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Heading className="h-4 w-4 text-slate-400" />
                      <span>Article Title</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Mastering state management in React 19"
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all"
                    />
                  </div>

                  {/* Category Pill select & Cover image URL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Selection */}
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="h-4 w-4 text-slate-400" />
                        <span>Category</span>
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all"
                      >
                        <option value="Technology">Technology</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Productivity">Productivity</option>
                      </select>
                    </div>

                    {/* Tags input */}
                    <div className="space-y-2">
                      <label htmlFor="tags" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Tag className="h-4 w-4 text-slate-400" />
                        <span>Tags</span>
                      </label>
                      <input
                        id="tags"
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="Comma separated: React, Frontend, WebDev"
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Cover Image URL */}
                  <div className="space-y-2">
                    <label htmlFor="coverImage" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="h-4 w-4 text-slate-400" />
                      <span>Cover Image URL (Suggested Default provided)</span>
                    </label>
                    <input
                      id="coverImage"
                      type="url"
                      required
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all"
                    />
                  </div>

                  {/* Description / Summary */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlignLeft className="h-4 w-4 text-slate-400" />
                      <span>Description / Excerpt</span>
                    </label>
                    <textarea
                      id="description"
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief excerpt shown on cards (optional - will auto-generate if empty)"
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all resize-none"
                    />
                  </div>

                  {/* Content (Body) */}
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlignLeft className="h-4 w-4 text-slate-400" />
                      <span>Post Content (Supports basic Markdown tags like # Heading and * List)</span>
                    </label>
                    <textarea
                      id="content"
                      required
                      rows={10}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="# Introducing React 19&#10;&#10;Write markdown format content here. Double returns create paragraphs..."
                      disabled={isSubmitting}
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all font-mono"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-4 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href="/"
                      className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting || !title || !content}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      ) : (
                        <>
                          <span>Publish Post</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
