'use client';

import React, { useState } from 'react';
import { apiService } from '@/services/api';
import { Mail, Send, Loader2, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const response = await apiService.subscribeNewsletter(email);
      setStatus('success');
      setMessage(response.message);
      setEmail('');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      setStatus('error');
      setMessage(err.response?.data?.error || 'Something went wrong. Please check your email and try again.');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 shadow-2xl dark:bg-slate-900/60 dark:border dark:border-slate-800 sm:px-10 lg:px-12">
      {/* Dynamic Background Blurs */}
      <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-md text-center">
        {status === 'success' ? (
          <div className="space-y-4 py-4 animate-in fade-in zoom-in duration-300">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Subscribed!</h3>
            <p className="text-sm text-slate-300">
              {message}
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Stay in the loop
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Subscribe to our newsletter to receive the latest development tips, design trends, and tech updates directly in your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  disabled={status === 'loading'}
                  className="w-full rounded-xl border-0 bg-white/5 py-3 pr-4 pl-12 text-sm text-white placeholder-slate-400 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 transition-colors"
              >
                {status === 'loading' ? (
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {status === 'error' && (
              <p className="mt-3 text-left text-xs text-rose-400 font-medium animate-in fade-in duration-200">
                {message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
