import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsServer, getPostServer } from '@/lib/posts-server';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { BookmarkButton } from '@/components/ui/BookmarkButton';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { AuthorCard } from '@/components/ui/AuthorCard';
import { BlogCard } from '@/components/ui/BlogCard';
import { formatDate } from '@/utils/helpers';
import { getBlogPostingSchema } from '@/utils/structured-data';
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await getPostServer(id);
    return {
      title: `${post.title} | TechTalks`,
      description: post.description,
      keywords: post.tags,
      openGraph: {
        title: post.title,
        description: post.description,
        images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
        type: 'article',
        publishedTime: post.createdAt,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [post.coverImage],
      },
      alternates: {
        canonical: `/blog/${post.id}`,
      },
    };
  } catch (error) {
    return {
      title: 'Article Not Found | TechTalks',
      description: 'The requested blog post could not be found.',
    };
  }
}

// Support Static Generation paths (pre-render all posts)
export async function generateStaticParams() {
  try {
    const { posts } = await getPostsServer({ limit: 100 });
    return posts.map((post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export default async function BlogDetail({ params }: PageProps) {
  const { id } = await params;
  
  let allPosts;
  try {
    const result = await getPostsServer({ limit: 100 });
    allPosts = result.posts;
  } catch (error) {
    console.error('Failed to load posts list:', error);
    notFound();
  }

  const postIndex = allPosts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    notFound();
  }

  const post = allPosts[postIndex];

  // Retrieve Previous and Next posts
  const prevPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const nextPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  // Retrieve Related posts (same category, excluding current post, max 3)
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Fallback related posts (if none in same category, just take other recent posts)
  const finalRelatedPosts = relatedPosts.length > 0 
    ? relatedPosts 
    : allPosts.filter((p) => p.id !== post.id).slice(0, 3);

  const siteUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';
  
  const jsonLdSchema = getBlogPostingSchema(post, siteUrl);

  return (
    <>
      {/* 1. JSON-LD Structured Data for Search Engine Crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Navbar />
      
      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      <div className="flex-1 w-full bg-slate-50/50 dark:bg-slate-950 transition-colors duration-200">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <article className="space-y-8">
            {/* Header Content */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <CategoryBadge category={post.category} size="md" />
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-tight">
                {post.title}
              </h1>

              {/* Author and Date Meta Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-slate-200 dark:border-slate-800/80 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 dark:border-slate-800">
                    <Image
                      src={post.authorImage}
                      alt={`Avatar of ${post.author}`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</p>
                    <time dateTime={post.createdAt} className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Share buttons */}
                  <ShareButtons title={post.title} />
                  
                  {/* Bookmark Button */}
                  <BookmarkButton post={post} className="shadow-sm" />
                </div>
              </div>
            </div>

            {/* Large Hero Image */}
            <div className="relative w-full aspect-21/9 sm:aspect-21/10 overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>

            {/* Markdown Content */}
            <div className="prose prose-slate max-w-none dark:prose-invert">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200 dark:border-slate-800/80">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Profile card */}
            <div className="pt-4">
              <AuthorCard name={post.author} image={post.authorImage} />
            </div>

            {/* Previous/Next Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800/80 pt-8">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.id}`}
                  className="group flex flex-col items-start p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-slate-700 transition-colors"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Previous Article</span>
                  </span>
                  <span className="mt-2 text-sm font-bold text-slate-900 dark:text-white line-clamp-1 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextPost && (
                <Link
                  href={`/blog/${nextPost.id}`}
                  className="group flex flex-col items-end p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/30 dark:hover:border-slate-700 transition-colors text-right"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span>Next Article</span>
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-2 text-sm font-bold text-slate-900 dark:text-white line-clamp-1 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </div>
          </article>

          {/* Related Articles Section */}
          <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {finalRelatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>

        </div>
      </div>

      <Footer />
    </>
  );
}
