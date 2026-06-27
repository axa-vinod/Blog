# TechTalks - Premium Production-Ready Next.js Blog Application

TechTalks is a modern, premium, highly responsive, and accessible blogging platform built with Next.js (App Router), React 19, and Tailwind CSS. The application is completely self-contained, SEO-optimized, and deployment-ready on Vercel without requiring major modifications.

## 🚀 Live Demo & Preview
Deploy directly to Vercel with one click:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com)

---

## ✨ Features

- **Server-Side Rendering (SSR):** Home feed and dynamic detail pages are server-rendered for instant loads and SEO.
- **Dynamic Routing:** Supports clean paths at `/blog/[id]` with static parameters pre-generation (`generateStaticParams`).
- **Authentication & Sign In:** Secure mock authentication state management. Allows signing in with **any custom email** and password (minimum 4 characters) or using defaults. Toggles password visibility dynamically.
- **Dynamic Article Editor:** Fully protected route at `/create` that lets users write and submit articles. The system parses the user's email prefix to dynamically credit them as the author!
- **Search Relevance Sorting:** Smart search relevance calculation prioritizing title matches, tagging hits, and description occurrences so that key articles rank first.
- **Subscription & Contact Hub:** Dedicated page at `/subscribe` with newsletter sign-ups, company contact details, and an interactive message center.
- **About Page:** Static About page at `/about` presenting our editorial values, mission, and stats.
- **Data Caching & State Management:** Powered by TanStack React Query for smooth caching, pagination transitions, and error states.
- **Bookmarks (LocalStorage):** Save and read favorite posts client-side. Works beautifully in SSR layouts without hydration errors.
- **Dark Mode Support:** Smooth class-based dark mode toggle synced with LocalStorage and Tailwind CSS v4 variables.
- **Sitemap & Robots.txt:** Programmatically generated `/sitemap.xml` and `/robots.txt`.
- **Structured Data (JSON-LD):** Injects Google-friendly `BlogPosting` schemas for rich article results in search engines.
- **Clean Architecture & AAA Accessibility:** Screen-reader accessible tags, semantic markup, keyboard focus rings, and proper color contrast values.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Typing:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Client & Fetching:** Axios, TanStack React Query (v5)
- **Icons:** Lucide React
- **Animations:** Framer Motion

---

## 📂 Folder Structure

```text
app/
├── layout.tsx                # Root layout, Theme & Query Providers
├── page.tsx                  # Home page (Awaits parameters, prefetches queries)
├── about/
│   └── page.tsx              # About page detailing values and stats
├── subscribe/
│   └── page.tsx              # Newsletter signup and direct contact form
├── create/
│   └── page.tsx              # Article creation editor (Auth protected)
├── login/
│   └── page.tsx              # Account sign in page with password visibility toggles
├── blog/[id]/
│   ├── page.tsx              # Dynamic article details (SSG paths, SEO Metadata)
│   └── not-found.tsx         # Custom 404 page for missing articles
├── api/
│   ├── posts/
│   │   ├── route.ts          # Central post query endpoint (Search, filters, sort)
│   │   └── [id]/route.ts      # Fetch single post and track views count
│   └── newsletter/route.ts   # Newsletter subscription handler
├── sitemap.ts                # Auto sitemap generator
└── robots.ts                 # Robots.txt generator
components/
├── layout/
│   ├── Navbar.tsx            # Sticky navigation, bookmark counter, theme toggle
│   ├── Footer.tsx            # Copyright, categories, and connect links
│   └── ThemeProvider.tsx     # Theme context and localStorage manager
├── ui/
│   ├── BlogCard.tsx          # Card with zoom transitions, badges, reading times
│   ├── FeaturedPost.tsx      # Dual-column Hero banner for featured articles
│   ├── CategoryBadge.tsx     # Colored badges based on category tags
│   ├── AuthorCard.tsx        # Profile footer showing author info and custom bios
│   ├── SearchBar.tsx         # Input with clearing actions
│   ├── LoadingSkeleton.tsx   # Visual grid/hero loaders
│   ├── ErrorComponent.tsx    # Message panels with retry callbacks
│   ├── Newsletter.tsx        # Form with status state indicators
│   ├── BookmarkButton.tsx    # Bookmark toggling
│   ├── ShareButtons.tsx      # Social share and copy-link triggers
│   ├── ReadingProgressBar.tsx# Sticky reading progress indicator
│   └── ScrollToTop.tsx       # Smooth scroll-to-top sticky button
hooks/
├── useAuth.ts                # Authentication session hook
├── usePosts.ts               # Hook to query lists
├── usePost.ts                # Hook to query single posts
├── useBookmarks.ts           # Safe localStorage bookmark synchronizer
└── useTheme.ts               # Theme context hook wrapper
lib/
├── axios.ts                  # Axios client resolving local or production URLs
├── mock-db.ts                # Mock database containing blog posts and comment lists
└── query-client.ts           # Global TanStack QueryClient options
services/
└── api.ts                    # Abstracted API methods
types/
└── index.ts                  # TypeScript types for Posts, Comments, and Subscriptions
utils/
├── helpers.ts                # Date formatting, reading times, text truncations
└── structured-data.ts        # Dynamic JSON-LD structured schemas builder
```

---

## 🔧 Installation

1. **Clone and Navigate:**
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Copy the example environment settings:
   ```bash
   cp .env.example .env.local
   ```

---

## 💻 Running Locally

Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## ⚙️ Account Credentials for Testing
You can sign in using **any custom email** and password (minimum length of 4 characters).
For quick default testing, you can also use:
- **Email:** `admin@techtalks.com`
- **Password:** `password123`

---

## 🏗️ Production Build

To compile a production bundle and run the server:
```bash
npm run build
npm run start
```

---

## ☁️ Deployment Steps (Vercel)

TechTalks is pre-configured for instant zero-setup deployments on Vercel:

1. **GitHub Integration:**
   Push this project to a GitHub/GitLab/Bitbucket repository.
2. **Import to Vercel:**
   Log into [Vercel](https://vercel.com) and click **Add New Project**, then import your repository.
3. **Deploy:**
   Vercel will auto-detect Next.js. Click **Deploy**. There is no need to configure environment variables; the application dynamically resolves URLs at runtime.

---

## 📄 License
This project is licensed under the MIT License.
