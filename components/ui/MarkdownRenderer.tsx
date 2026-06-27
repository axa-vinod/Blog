'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!content) return null;

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let inList = false;
  let listItems: string[] = [];
  
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeLang = '';
  let elementIndex = 0;

  const handleCopyCode = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  const renderList = (items: string[], key: string) => (
    <ul key={key} className="list-disc pl-6 my-4 space-y-2 text-slate-700 dark:text-slate-300">
      {items.map((item, idx) => (
        <li key={idx} className="leading-relaxed">{item}</li>
      ))}
    </ul>
  );

  const renderCodeBlock = (codeLines: string[], lang: string, index: number) => {
    const code = codeLines.join('\n');
    return (
      <div key={`code-${index}`} className="relative my-6 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-slate-100 shadow-lg text-sm">
        <div className="flex justify-between items-center px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs font-semibold text-slate-400">
          <span>{lang || 'code'}</span>
          <button
            onClick={() => handleCopyCode(code, index)}
            className="flex items-center gap-1 hover:text-white transition-colors"
            aria-label="Copy code block"
          >
            {copiedIndex === index ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto font-mono leading-relaxed select-all">
          <code>{code}</code>
        </pre>
      </div>
    );
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        renderedElements.push(renderCodeBlock(codeBlockLines, codeLang, elementIndex++));
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        // Start of code block
        inCodeBlock = true;
        codeLang = line.replace('```', '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Handle Unordered Lists
    if (line.trim().startsWith('* ')) {
      inList = true;
      listItems.push(line.replace('* ', '').trim());
      continue;
    } else if (line.trim().startsWith('1. ') || line.trim().startsWith('2. ') || line.trim().startsWith('3. ') || line.trim().startsWith('4. ')) {
      // Treat numbered lists as standard bullet points for visual simplicity or wrap accordingly
      inList = true;
      listItems.push(line.replace(/^\d+\.\s+/, '').trim());
      continue;
    } else {
      if (inList) {
        renderedElements.push(renderList(listItems, `list-${elementIndex++}`));
        listItems = [];
        inList = false;
      }
    }

    // Handle Headings & Dividers
    if (line.trim() === '---') {
      renderedElements.push(
        <hr key={`hr-${elementIndex++}`} className="my-8 border-slate-200 dark:border-slate-800" />
      );
    } else if (line.startsWith('# ')) {
      renderedElements.push(
        <h1 key={`h1-${elementIndex++}`} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-8 mb-4 tracking-tight leading-tight">
          {line.replace('# ', '').trim()}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      renderedElements.push(
        <h2 key={`h2-${elementIndex++}`} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3 tracking-tight leading-tight">
          {line.replace('## ', '').trim()}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      renderedElements.push(
        <h3 key={`h3-${elementIndex++}`} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2 leading-tight">
          {line.replace('### ', '').trim()}
        </h3>
      );
    } else if (line.trim()) {
      // Standard Paragraph
      renderedElements.push(
        <p key={`p-${elementIndex++}`} className="text-base leading-relaxed text-slate-700 dark:text-slate-300 my-4">
          {/* Support basic inline code block styling */}
          {line.split('`').map((part, index) => {
            if (index % 2 === 1) {
              return (
                <code key={index} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                  {part}
                </code>
              );
            }
            return part;
          })}
        </p>
      );
    }
  }

  // Push list if still open at end of text
  if (inList) {
    renderedElements.push(renderList(listItems, `list-${elementIndex++}`));
  }

  return <div className="space-y-1">{renderedElements}</div>;
}
