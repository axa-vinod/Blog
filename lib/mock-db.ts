import { Post, Comment } from '@/types';

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Frontend Development: Next.js 16 and Beyond',
    description: 'Explore the key features in the new Next.js release, including React 19 integration, runtime performance optimizations, and the next-generation compilation tooling.',
    content: `
# The Future of Frontend Development: Next.js 16 and Beyond

Frontend development is evolving at a breakneck pace. With the recent release of Next.js 16 and React 19, the ecosystem has received its most significant update in years. In this post, we will dive deep into what makes this release a game-changer for developers and organizations alike.

---

## 1. Seamless React 19 Integration

React 19 brings powerful new primitives directly into the rendering loop. Next.js 16 leverages these to offer:

* **React Compiler support:** Automatic memoization of components (no more manual \`useMemo\` and \`useCallback\`).
* **Server Actions as first-class citizens:** Enhanced form handling, state transitions, and server-client data flow.
* **Asset Loading improvements:** Stylesheets, fonts, and scripts are loaded out-of-band and prioritized based on viewport requirements.

Here is a quick example of a Server Action in Next.js 16:

\`\`\`typescript
// app/actions.ts
'use server';

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get('email');
  // Process subscription...
  return { success: true };
}
\`\`\`

---

## 2. Next-Generation Compilation with Rspack

Next.js 16 introduces experimental support for **Rspack** as an alternative to Webpack. Rspack, written in Rust, drops build and hot-reload times significantly—sometimes up to **10x faster** on large codebases. This means local development feedback loops are practically instantaneous.

---

## 3. Strict Hydration and Layout Stability

One of the most frustrating aspects of Server-Side Rendering (SSR) is handling hydration mismatches. Next.js 16 features:

1. **Enhanced Hydration Error Reporting:** Highlights the exact mismatching node and provides automated suggestions.
2. **Layout-Level Cache Isolation:** Layout structures are preserved and cached across routing transitions, preventing unnecessary redraws.

---

## Summary

Next.js 16 is not just a version bump; it represents a major shift toward high-performance, developer-first compilation and runtime efficiency. By upgrading your stack, you can benefit from auto-memoization, lightning-fast builds, and superior Core Web Vitals.
    `,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'Development',
    author: 'Sarah Connor',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-25T08:00:00Z',
    readingTime: '5 min read',
    tags: ['Nextjs', 'React', 'Frontend', 'WebDev'],
    views: 1240,
    likes: 312,
    featured: true
  },
  {
    id: '2',
    title: 'Mastering Glassmorphism in Modern UI Design',
    description: 'Learn the principles of glassmorphism design, including background blurs, multi-layered drop shadows, and visual hierarchy tips to wow your users.',
    content: `
# Mastering Glassmorphism in Modern UI Design

Glassmorphism has taken the design world by storm. Originating from modern operating systems (like macOS Big Sur and Windows 11 Fluent Design), this design trend uses opacity, background blur, and subtle borders to mimic frosted glass. When executed properly, it can give your web applications a sleek, premium, and futuristic look.

---

## The Core Principles of Glassmorphism

To make a glassmorphism component look realistic and aesthetically pleasing, you need to master three core CSS properties:

1. **Background Color with Translucency:** Usually a light or dark color with low opacity (e.g., \`rgba(255, 255, 255, 0.1)\`).
2. **Background Blur:** The CSS property \`backdrop-filter: blur(px)\` is what creates the frosted effect.
3. **Subtle Border:** A thin border with higher opacity helps define the edges of the card.
4. **Vibrant Background:** Glassmorphism requires a colorful, dynamic background to shine. Plain solid backgrounds make glassmorphism look flat and gray.

---

## Implementing Glassmorphism with Tailwind CSS

Tailwind CSS v4 makes background filters extremely straightforward. Here is how you can build a premium glassmorphic card:

\`\`\`html
<div class="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
  <h3 class="text-white font-bold text-lg">Premium Glass Card</h3>
  <p class="text-white/80 text-sm mt-2">Beautifully blurred content.</p>
</div>
\`\`\`

---

## Do's and Don'ts

### Do
* Use high-quality gradient or photographic backgrounds.
* Maintain a clean hierarchy with high-contrast text.
* Apply subtle white borders to separate layers.

### Don't
* Overuse the effect on every element; it will clutter the interface.
* Use it on low-contrast elements where text readability becomes compromised.
* Forget accessibility guidelines. Ensure there is enough contrast for color-blind or low-vision users.
    `,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'Design',
    author: 'Alex Mercer',
    authorImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-24T10:30:00Z',
    readingTime: '4 min read',
    tags: ['UI Design', 'CSS', 'Tailwind', 'Aesthetics'],
    views: 980,
    likes: 215,
    featured: false
  },
  {
    id: '3',
    title: 'Productivity Hacks for Remote Engineers',
    description: 'How to structure your day, limit context switching, and maintain a healthy work-life balance while shipping code from home.',
    content: `
# Productivity Hacks for Remote Engineers

Working from home offers immense flexibility, but it also comes with major distractions and the risk of burnout. When your office is your living room, the boundaries between professional and personal life blur. In this article, we share practical strategies to help remote engineers maximize output while maintaining peace of mind.

---

## 1. Protect Your Maker Time

Paul Graham's classic distinction between the **Maker's Schedule** and the **Manager's Schedule** is crucial. Makers need long, uninterrupted blocks of time (3 to 4 hours) to write code and solve deep logical problems.

* **Block your calendar:** Reserve 9:00 AM to 12:00 PM or 2:00 PM to 5:00 PM daily for deep work.
* **Snooze Slack/Teams notifications:** Set your status to "Focus Mode" and only check messages between deep work blocks.
* **Batch meetings:** Try to schedule all syncs, standups, and interviews on specific days (e.g., "Meeting Tuesdays").

---

## 2. Eliminate Context Switching

Context switching is the ultimate productivity killer for programmers. It takes an average of **23 minutes** to regain focus after an interruption.

* **Single-tasking:** Commit to one user story, bug ticket, or feature branch at a time.
* **Local environment optimization:** Use workspace configurations that allow you to spin up services instantly.
* **Keep a scratchpad:** When random ideas or secondary tasks pop up, write them down immediately and return to your primary task.

---

## 3. Physical & Mental Boundaries

* **Dedicated workspace:** Have a separate room or a specific corner of your house that is strictly for work.
* **The "Commute" routine:** Start and end your day with a short walk or a cup of tea to signify the transition between home and work.
* **Shutdown ritual:** At 5:30 PM or 6:00 PM, close your laptop, clean your desk, and commit your final changes. Walk away and do not check work apps on your phone.

---

## Conclusion

Productivity is not about working 12 hours a day; it is about working focus-fully for 4 to 6 hours and letting your mind rest for the remaining time. By protecting your maker time and setting healthy boundaries, you can achieve both professional growth and personal happiness.
    `,
    coverImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80',
    category: 'Productivity',
    author: 'Elena Rostova',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-22T14:15:00Z',
    readingTime: '6 min read',
    tags: ['Productivity', 'Remote Work', 'Career', 'MentalHealth'],
    views: 1450,
    likes: 420,
    featured: false
  },
  {
    id: '4',
    title: 'Why We Switched from REST to GraphQL for our Mobile Clients',
    description: 'A deep-dive case study explaining the trade-offs, performance gains, and schema-stitching challenges we encountered when moving away from RESTful endpoints.',
    content: `
# Why We Switched from REST to GraphQL for our Mobile Clients

As our product matured, our mobile applications suffered from slow load times, especially over slow 3G and 4G networks. Upon analysis, we discovered that the bottleneck was not CPU or memory rendering, but network efficiency. Specifically: **over-fetching** and **under-fetching** data from our traditional REST endpoints.

Here is the story of how and why we migrated our API architecture to GraphQL.

---

## The Issues with REST

In our old REST structure, fetching the home feed required calling multiple endpoints:

1. \`/api/v1/users/me\` - User profile.
2. \`/api/v1/posts\` - Recent posts (returned title, date, excerpt, author_id).
3. \`/api/v1/users/[author_id]\` - Author details (called recursively or in batch).
4. \`/api/v1/posts/[post_id]/likes\` - Current user like status.

This resulted in **4 separate round-trips** and transfer of massive payloads containing fields our mobile feed did not even display (like user addresses, full bios, and historic post stats).

---

## The GraphQL Solution

With GraphQL, our mobile clients query exactly what they need in a single round-trip:

\`\`\`graphql
query GetHomeFeed {
  currentUser {
    username
    avatarUrl
  }
  posts(limit: 10) {
    id
    title
    createdAt
    coverImage
    author {
      name
      avatarUrl
    }
    isLikedByMe
  }
}
\`\`\`

---

## Performance Gains

By moving our data gathering to the server side and sending a single optimized query payload, we recorded:

* **62% reduction** in network payload size.
* **45% improvement** in mobile page transition speed (Time to Interactive).
* **Significant reduction** in battery drainage and data usage for our end users.

---

## Key Challenges Faced

Migrating is not without trade-offs. We had to overcome:

* **Caching difficulties:** GraphQL queries use HTTP POST, meaning standard HTTP CDNs cannot cache responses out of the box. We solved this using Persisted Queries and Apollo Server's edge caching.
* **N+1 Database Query problems:** Resolved using DataLoader libraries to batch and cache database operations.
    `,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'Technology',
    author: 'James Watson',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-20T09:00:00Z',
    readingTime: '7 min read',
    tags: ['GraphQL', 'API', 'REST', 'Backend', 'Mobile'],
    views: 890,
    likes: 180,
    featured: false
  },
  {
    id: '5',
    title: 'Designing Accessible Components with Tailwind CSS',
    description: 'Ensuring your web app conforms to WCAG guidelines by using keyboard navigation, screen reader accessibility, and correct contrast ratios in Tailwind.',
    content: `
# Designing Accessible Components with Tailwind CSS

Web accessibility (a11y) is no longer a "nice-to-have" feature; it is a fundamental requirement. Creating digital spaces that everyone can use—including people with visual, motor, auditory, or cognitive disabilities—is critical.

In this article, we'll see how to leverage Tailwind CSS to build beautiful, accessible components without compromising on aesthetics.

---

## 1. Focus States: Do Not Hide Them!

Many developers disable outline rings (\`focus:outline-none\`) because they look unappealing. This makes keyboard navigation impossible for screen reader and keyboard-only users.

Instead of hiding the focus indicator, style it with custom Tailwind rings:

\`\`\`html
<button class="bg-indigo-600 text-white px-4 py-2 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
  Subscribe
</button>
\`\`\`

---

## 2. Color Contrast Compliance

To meet WCAG AA standards, text must have a contrast ratio of at least **4.5:1** against its background (or 3:1 for large text).

* **Bad contrast:** \`bg-gray-100 text-gray-400\`
* **Good contrast:** \`bg-gray-100 text-gray-700\` or \`bg-slate-900 text-slate-100\`

Tailwind's color scale makes it easy to choose accessible pairs (e.g., using weight 900 for text on 100/200 backgrounds).

---

## 3. Screen Reader Only Utility

Sometimes, you need details for screen readers that are visually hidden from desktop users. Use Tailwind's \`sr-only\` class:

\`\`\`html
<button class="p-2 hover:bg-slate-100 rounded-full">
  <svg class="h-6 w-6">...</svg>
  <span class="sr-only">Close Modal</span>
</button>
\`\`\`

This provides screen reader users with context about what the button does, while visual users see the icon.

---

## Summary

Accessibility is a design paradigm. By utilizing Tailwind's focus, ring, border, and \`sr-only\` classes, you can easily build highly accessible components that look stunning and cater to everyone.
    `,
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    category: 'Design',
    author: 'Sarah Connor',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-18T11:45:00Z',
    readingTime: '5 min read',
    tags: ['A11y', 'Accessibility', 'Tailwind', 'DesignSystem'],
    views: 1120,
    likes: 290,
    featured: false
  },
  {
    id: '6',
    title: 'Building a Fast and Type-Safe Blog using TanStack Query',
    description: 'Learn how to configure TanStack Query (React Query) to fetch, cache, and mutate data efficiently, using Axios and TypeScript.',
    content: `
# Building a Fast and Type-Safe Blog using TanStack Query

When fetching data in modern React web applications, using native \`useEffect\` can lead to messy state management, race conditions, and lack of caching.

**TanStack React Query** resolves these issues by serving as an asynchronous state manager. In this tutorial, we will set up React Query in a TypeScript Next.js application.

---

## 1. Setting up the QueryClient

First, initialize a client and wrap your app layout with the provider:

\`\`\`typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      refetchOnWindowFocus: false,
    },
  },
});
\`\`\`

Wrap your application in your root layout:

\`\`\`tsx
// app/providers.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
\`\`\`

---

## 2. Creating Custom Type-Safe Hooks

By packaging React Query logic inside custom hooks, we keep components clean and reusable.

\`\`\`typescript
// hooks/usePosts.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Post } from '@/types';

export function usePosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axios.get('/api/posts');
      return data;
    },
  });
}
\`\`\`

---

## Advantages of this Approach

* **Automatic Caching:** Sub-pages reuse fetched data instantly.
* **Loading & Error States:** React Query provides boolean variables like \`isLoading\`, \`isError\`, and \`error\` automatically.
* **Background Refetching:** Stale data is refreshed in the background without disturbing the user interface.
    `,
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
    category: 'Development',
    author: 'Elena Rostova',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-15T09:20:00Z',
    readingTime: '5 min read',
    tags: ['ReactQuery', 'TypeScript', 'Axios', 'Caching'],
    views: 1300,
    likes: 345,
    featured: false
  },
  {
    id: '7',
    title: '10 Essential Habits for High-Performing Tech Teams',
    description: 'From documentation culture to blameless post-mortems, here are the key practices that set elite engineering groups apart.',
    content: `
# 10 Essential Habits for High-Performing Tech Teams

What makes an engineering team exceptional? It is rarely about the raw intelligence of individual contributors. Instead, it is about the **shared culture, systems, and habits** that allow a group of developers to function as a cohesive, high-velocity unit.

Here are the 10 essential habits we have observed in elite tech organizations.

---

## 1. Blameless Post-Mortems

When things break—and they always do—high-performing teams do not search for a scapegoat. They ask: **"What systematic failures allowed this error to happen, and how can we prevent it?"** This builds a culture of safety and transparent feedback.

---

## 2. Strong Documentation Culture

"If it isn't documented, it doesn't exist." Elite teams prioritize markdown files in Git repositories, clean diagrams, and updated API docs. This reduces onboarding time for new developers from months to days.

---

## 3. Automation First

* **Continuous Integration (CI):** Every push runs linters, unit tests, and type-checks.
* **Continuous Deployment (CD):** Merges to main go to production automatically or at the press of a button.
* **Infrastructure as Code (IaC):** Services are defined programmatically, not manually.

---

## 4. Short Feedback Loops

Instead of working on feature branches for months, elite teams merge code in small increments daily. Feature flags (like LaunchDarkly or custom keys) are used to decouple deployments from releases.

---

## Summary

Building a top-tier tech team is a continuous process of refining habits. Focus on safety, documentation, automation, and short feedback loops, and watch your velocity and developer satisfaction soar.
    `,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    category: 'Productivity',
    author: 'James Watson',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-12T16:00:00Z',
    readingTime: '6 min read',
    tags: ['Tech Leadership', 'DevOps', 'Productivity', 'Culture'],
    views: 1670,
    likes: 512,
    featured: false
  },
  {
    id: '8',
    title: 'Why TypeScript is Crucial for Large-Scale Next.js Applications',
    description: 'Avoid runtime crashes and enable seamless collaboration by implementing robust static typing. Let’s dive into setup and optimization.',
    content: `
# Why TypeScript is Crucial for Large-Scale Next.js Applications

When starting a small project, JavaScript can feel faster. There is no compiler to argue with, and you can write flexible code. However, as codebases grow past a few thousand lines and teams expand, untyped JavaScript becomes a liability.

In this post, we explain why **TypeScript** is essential for maintaining Next.js applications in enterprise environments.

---

## 1. Catching Bugs at Compile Time

In JavaScript, simple spelling mistakes or incorrect property lookups are only caught when they crash the application at runtime. TypeScript identifies these immediately in your editor.

\`\`\`typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const showProfile = (user: UserProfile) => {
  // ERROR: Property 'username' does not exist on type 'UserProfile'
  console.log(user.username); 
}
\`\`\`

---

## 2. Refactoring with Confidence

Imagine changing the data structure of a core entity (e.g. adding a field to \`Post\`).
* **Without TypeScript:** You have to manually search the codebase for every usage of \`Post\` and hope you do not miss any subcomponents.
* **With TypeScript:** The compiler immediately lists every single file that needs updating. You can refactor large portions of code in minutes.

---

## 3. Seamless Integration with Next.js App Router

Next.js is built from the ground up with TypeScript. By utilizing Next.js configurations, you get automated typing for:

1. **Page parameters:** e.g. \`{ params: { id: string } }\`
2. **API routes:** request and response typing
3. **Static Generation paths**

---

## Conclusion

The initial learning curve of TypeScript is well worth the returns. It acts as documentation, testing, and guardrails all in one, making it a critical choice for any professional developer today.
    `,
    coverImage: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=1200&q=80',
    category: 'Technology',
    author: 'Sarah Connor',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    createdAt: '2026-06-08T08:15:00Z',
    readingTime: '5 min read',
    tags: ['TypeScript', 'Nextjs', 'JavaScript', 'Programming'],
    views: 1410,
    likes: 389,
    featured: false
  }
];
export const mockComments: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      postId: '1',
      author: 'David Beckham',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      content: 'Absolutely thrilled about Next.js 16! Rspack support is going to make our build times so much better.',
      createdAt: '2026-06-25T09:30:00Z'
    },
    {
      id: 'c2',
      postId: '1',
      author: 'Julie Andrews',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      content: 'Server Actions automatically compiled is such a time saver. Great breakdown of these features.',
      createdAt: '2026-06-25T11:45:00Z'
    }
  ]
};
