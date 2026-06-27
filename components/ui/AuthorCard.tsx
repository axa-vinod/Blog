import React from 'react';
import Image from 'next/image';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface AuthorCardProps {
  name: string;
  image: string;
}

export function AuthorCard({ name, image }: AuthorCardProps) {
  // Mock author description based on names in our mock database
  const getBio = (authorName: string) => {
    switch (authorName.toLowerCase()) {
      case 'sarah connor':
        return 'Senior Frontend Architect specializing in React, Next.js, and design systems. Passionate about performance tuning and writing clean, scalable code.';
      case 'alex mercer':
        return 'Product Designer and CSS enthusiast. Alex focuses on user interfaces, interactive animations, and bringing delightful aesthetics to functional layouts.';
      case 'elena rostova':
        return 'Software Engineer and productivity consultant. Elena writes about workflow optimizations, team collaboration architectures, and remote software engineering career growth.';
      case 'james watson':
        return 'Full-Stack Developer and Technical Director. James writes about backend technologies, API design, DevOps workflows, and infrastructure scaling.';
      default:
        return 'Writer, software designer, and technology enthusiast. Contributing insights and articles on frontend systems and modern software design.';
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-3xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800/80 dark:bg-slate-900/20">
      {/* Avatar */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 dark:border-slate-800">
        <Image
          src={image}
          alt={`Avatar of ${name}`}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left space-y-2">
        <span className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
          About The Author
        </span>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
          {name}
        </h4>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {getBio(name)}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center sm:justify-start gap-3.5 pt-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter Profile"
            className="text-slate-400 hover:text-indigo-500 transition-colors"
          >
            <TwitterIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <GithubIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <LinkedinIcon className="h-4.5 w-4.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
