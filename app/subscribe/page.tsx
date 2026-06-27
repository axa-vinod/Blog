'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiService } from '@/services/api';
import { 
  Mail, Phone, MapPin, Send, Loader2, 
  CheckCircle2, AlertCircle, 
  MessageSquare, User, HelpCircle 
} from 'lucide-react';

export default function SubscribePage() {
  // Newsletter form states
  const [newsEmail, setNewsEmail] = useState('');
  const [newsStatus, setNewsStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsMsg, setNewsMsg] = useState('');

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('General Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactMsg, setContactMsg] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsEmail) return;

    setNewsStatus('loading');
    setNewsMsg('');

    try {
      const res = await apiService.subscribeNewsletter(newsEmail);
      setNewsStatus('success');
      setNewsMsg(res.message);
      setNewsEmail('');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setNewsStatus('error');
      setNewsMsg(error.response?.data?.error || 'Something went wrong. Please check your email and try again.');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setContactStatus('loading');
    setContactMsg('');

    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic client validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setContactStatus('error');
      setContactMsg('Please enter a valid email address.');
      return;
    }

    setContactStatus('success');
    setContactMsg('Message received! Our team will get back to you within 24 hours.');
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const contactOptions = ['General Inquiry', 'Technical Support', 'Partnerships', 'Feedback'];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 py-12 px-4">
        <div className="mx-auto max-w-6xl space-y-12">
          
          {/* Header */}
          <section className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Get in Touch & Subscribe
            </h1>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Stay updated with the latest in technology, frontend development, and design. Have a question or feedback? Drop us a line below.
            </p>
          </section>

          {/* Two Column Layout: Subscription Form (Left) & Contact Details + Contact Form (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Subscription Dashboard (4 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Premium Newsletter Card */}
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 shadow-2xl dark:bg-slate-900/60 dark:border dark:border-slate-800 sm:px-10">
                <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Weekly Tech Newsletter</h2>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      Join 15,000+ developers receiving our premium weekly digest. No spam, just curated code snippets, UI trends, and technology updates.
                    </p>
                  </div>

                  {newsStatus === 'success' ? (
                    <div className="space-y-4 py-4 animate-in fade-in zoom-in duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Thank you!</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{newsMsg}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-500">
                          <Mail className="h-4.5 w-4.5" />
                        </div>
                        <input
                          type="email"
                          required
                          value={newsEmail}
                          onChange={(e) => setNewsEmail(e.target.value)}
                          placeholder="Enter your email address"
                          aria-label="Email address for subscription"
                          disabled={newsStatus === 'loading'}
                          className="w-full rounded-xl border-0 bg-white/5 py-3 pr-4 pl-12 text-sm text-white placeholder-slate-400 ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={newsStatus === 'loading' || !newsEmail}
                        className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                      >
                        {newsStatus === 'loading' ? (
                          <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        ) : (
                          <>
                            <span>Subscribe to Newsletter</span>
                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      {newsStatus === 'error' && (
                        <div className="flex gap-2 text-xs text-rose-400 font-semibold animate-in fade-in duration-200 pt-1">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <p>{newsMsg}</p>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>

              {/* Static Contact Info Details */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 space-y-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</h4>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">hello@techtalks.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Support</h4>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">+1 (555) 019-2834</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visit Headquarters</h4>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                        TechTalks Media HQ<br />
                        100 Innovation Way, Suite 400<br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800/80 mb-6">
                Send a Direct Message
              </h2>

              {contactStatus === 'success' ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Sent</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    {contactMsg}
                  </p>
                  <button
                    onClick={() => setContactStatus('idle')}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  
                  {/* Name and Email side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="h-4 w-4 text-slate-400" />
                        <span>Full Name</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        disabled={contactStatus === 'loading'}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span>Email Address</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@example.com"
                        disabled={contactStatus === 'loading'}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 text-slate-400" />
                      <span>Subject</span>
                    </label>
                    <select
                      id="subject"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      disabled={contactStatus === 'loading'}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all"
                    >
                      {contactOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-slate-400" />
                      <span>Message</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Write your message details here..."
                      disabled={contactStatus === 'loading'}
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 transition-all resize-none"
                    />
                  </div>

                  {/* Error banner */}
                  {contactStatus === 'error' && (
                    <div className="flex gap-2 text-xs text-rose-500 dark:text-rose-400 font-semibold animate-in fade-in duration-200">
                      <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                      <p>{contactMsg}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={contactStatus === 'loading' || !contactName || !contactEmail || !contactMessage}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                    >
                      {contactStatus === 'loading' ? (
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
