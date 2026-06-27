'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, ShieldCheck, Zap, Heart, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Technical Accuracy',
      desc: 'Our writers are senior frontend developers, designers, and DevOps engineers. Every article is peer-reviewed and tested for correctness.',
    },
    {
      icon: <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Actionable Insights',
      desc: 'We focus on practical guides, production-level code snippets, and performance tuning that you can directly apply in your work.',
    },
    {
      icon: <Heart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Community Focused',
      desc: 'TechTalks is a platform made by developers, for developers. We keep our guides open, accessible, and structured for all levels.',
    },
    {
      icon: <Award className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Premium Aesthetics',
      desc: 'We believe code and design walk hand-in-hand. Our platform prioritizes clean typography, visual spacing, and beautiful user experience.',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200 py-12 px-4">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Hero Banner */}
          <section className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 shadow-sm">
              <BookOpen className="h-7 w-7" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              About TechTalks
            </h1>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
              TechTalks is a developer-centric blogging platform dedicated to sharing high-quality, actionable, and type-safe frontend guides, UI/UX designs, and productivity hacks.
            </p>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            {[
              { label: 'Published Posts', val: '100+' },
              { label: 'Weekly Readers', val: '15k+' },
              { label: 'Active Writers', val: '24' },
              { label: 'Satisfaction', val: '99%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/30"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {stat.val}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </section>

          {/* Mission Description */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Our Core Mission
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                The modern frontend landscape is complex. New frameworks, bundling solutions, compilation systems, and layout methodologies emerge daily. Our goal is to provide **clarity and structure**.
              </p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                We avoid generic tutorials. Instead, we publish detailed guides with full TS interfaces, runtime error analyses, and real-world trade-off discussions. Whether you are scaling Next.js layouts or optimizing Webpack bundles, TechTalks has you covered.
              </p>
            </div>
            <div className="relative rounded-3xl overflow-hidden aspect-16/10 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="TechTalks Core Team brainstorming UI layout cards"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
          </section>

          {/* Core Values Cards */}
          <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight text-center">
              Our Core Editorial Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="flex gap-4 p-5 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/30"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-950">
                    {v.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {v.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
