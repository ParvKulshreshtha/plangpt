"use client";

import { useMemo } from "react";

type ParsedBlock =
  | { kind: "markdown"; content: string }
  | {
      kind: "custom";
      id: string;
      format: "table" | "cards" | "checklist";
      title: string;
      data: Record<string, unknown>;
    };

function parseAnswerContent(text: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const regex = /```json:([^\n]+)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({
        kind: "markdown",
        content: text.slice(lastIndex, match.index).trim(),
      });
    }

    try {
      const parsed = JSON.parse(match[2].trim()) as {
        format?: "table" | "cards" | "checklist";
        title?: string;
        data?: Record<string, unknown>;
      };
      blocks.push({
        kind: "custom",
        id: match[1],
        format: parsed.format || "table",
        title: parsed.title || match[1],
        data: parsed.data || {},
      });
    } catch {
      blocks.push({ kind: "markdown", content: match[0] });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    blocks.push({ kind: "markdown", content: text.slice(lastIndex).trim() });
  }

  return blocks.filter((b) => (b.kind === "markdown" ? b.content.length > 0 : true));
}

function MarkdownBlock({ content }: { content: string }) {
  const html = useMemo(() => formatMarkdown(content), [content]);
  return (
    <div
      className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-neon-blue [&_h2]:mt-4 [&_h2]:mb-2 [&_strong]:text-neon-purple"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function formatMarkdown(content: string): string {
  let html = content;
  html = html.replace(/^##\s(.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^###\s(.*)$/gm, "<h3 class='font-semibold text-gray-900 mt-3 mb-1'>$1</h3>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\n\n/g, "</p><p class='mt-2'>");
  html = html.replace(/\n/g, "<br/>");
  if (!html.startsWith("<")) {
    html = `<p>${html}</p>`;
  }
  return html;
}

function CustomTable({ title, data }: { title: string; data: Record<string, unknown> }) {
  const headers = (data.headers as string[]) || [];
  const rows = (data.rows as string[][]) || [];

  if (!headers.length && !rows.length) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white/80">
      {title && (
        <div className="px-4 py-2 border-b border-gray-100 text-sm font-semibold text-gray-800">
          {title}
        </div>
      )}
      <table className="w-full text-sm">
        {headers.length > 0 && (
          <thead>
            <tr className="bg-pastel-blue/20">
              {headers.map((h) => (
                <th key={h} className="px-4 py-2 text-left font-semibold text-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-gray-100">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomCards({ title, data }: { title: string; data: Record<string, unknown> }) {
  const items = (data.items as { title: string; description: string }[]) || [];
  if (!items.length) return null;

  return (
    <div className="space-y-2">
      {title && <p className="text-sm font-semibold text-gray-800">{title}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white/90 p-4 hover:border-neon-blue/25 transition"
          >
            <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomChecklist({ title, data }: { title: string; data: Record<string, unknown> }) {
  const items = (data.items as string[]) || [];
  if (!items.length) return null;

  return (
    <div className="space-y-2">
      {title && <p className="text-sm font-semibold text-gray-800">{title}</p>}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-gray-700 rounded-lg bg-white/80 border border-gray-100 px-3 py-2"
          >
            <span className="mt-0.5 w-4 h-4 rounded border border-neon-green/50 bg-neon-green/10 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AnswerRenderer({ content }: { content: string }) {
  const blocks = useMemo(() => parseAnswerContent(content), [content]);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.kind === "markdown") {
          return <MarkdownBlock key={i} content={block.content} />;
        }

        switch (block.format) {
          case "table":
            return <CustomTable key={i} title={block.title} data={block.data} />;
          case "cards":
            return <CustomCards key={i} title={block.title} data={block.data} />;
          case "checklist":
            return <CustomChecklist key={i} title={block.title} data={block.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
