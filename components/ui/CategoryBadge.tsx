import React from 'react';

interface CategoryBadgeProps {
  category: string;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const getColors = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'development':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/30';
      case 'design':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/30';
      case 'technology':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/30';
      case 'productivity':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30';
      default:
        return 'bg-slate-50 text-slate-700 dark:bg-slate-900/40 dark:text-slate-400 border-slate-200/50 dark:border-slate-800/30';
    }
  };

  const sizeClasses = size === 'sm' 
    ? 'px-2.5 py-0.5 text-xs font-semibold' 
    : 'px-3 py-1 text-sm font-semibold';

  return (
    <span className={`inline-flex items-center rounded-full border ${getColors(category)} ${sizeClasses}`}>
      {category}
    </span>
  );
}
