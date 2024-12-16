"use client";

import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { ArrowUpRight, GitForkIcon, Star, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import { ProjectData, Languages } from "@/types/project-data";
import { cn } from "@/lib/utils";
import { instrumentSerif } from "@/lib/fonts";

const colors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  CSS: "bg-purple-500",
  HTML: "bg-orange-500",
  Python: "bg-green-500",
  Java: "bg-red-500",
  C: "bg-gray-500",
  CSharp: "bg-blue-500",
  CPlusPlus: "bg-green-500",
  Go: "bg-blue-500",
  Ruby: "bg-red-500",
  PHP: "bg-purple-500",
  Swift: "bg-green-500",
  Kotlin: "bg-red-500",
  Rust: "bg-orange-500",
  Shell: "bg-gray-500",
};

async function getProjectData(
  owner: string,
  repo: string
): Promise<ProjectData> {
  const res = await fetch(`/api/project?owner=${owner}&repo=${repo}`);
  if (!res.ok) throw new Error("Failed to fetch project data");
  return res.json();
}

function LanguageBar({ languages }: { languages: Languages }) {
  const total = Object.values(languages).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden flex">
      {Object.entries(languages).map(([lang, size]) => {
        const percentage = (size / total) * 100;

        return (
          <div
            key={lang}
            className={`${colors[lang] || "bg-gray-500"}`}
            style={{ width: `${percentage}%` }}
          />
        );
      })}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b pb-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-2 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  );
}

export default function RepoPage() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const username = parts[0];
  const repo = parts[1];

  const { data, isLoading, error } = useQuery({
    queryKey: ["project", username, repo],
    queryFn: () => getProjectData(username, repo),
    enabled: !!username && !!repo,
  });

  if (!username || !repo) {
    return <div className="text-red-500">Invalid URL format</div>;
  }

  if (isLoading) return <LoadingState />;

  if (error)
    return <div className="text-red-500">Error loading repository data</div>;

  if (!data) return null;

  const { repository, languages, readme } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Repository Header */}
        <div className="border-b pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1
                className={cn(
                  "text-3xl font-bold flex items-center gap-2",
                  instrumentSerif.className
                )}
              >
                {repository.name}
                <a
                  href={repository.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ArrowUpRight size={20} />
                </a>
              </h1>
              <p className="text-gray-600 mt-2">{repository.description}</p>
            </div>
            <div className="flex sm:flex-col gap-4 sm:gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star size={16} />
                <span>{repository.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitForkIcon size={16} />
                <span>{repository.forks_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{repository.watchers_count}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Language Stats */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Languages</h2>
          <LanguageBar languages={languages} />
          <div className="flex gap-4 text-sm text-gray-600">
            {Object.entries(languages).map(([lang, size]) => (
              <div key={lang} className="flex items-center gap-1">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    colors[lang] || "bg-gray-500"
                  )}
                />
                <span>{lang}</span>
                <span className="text-gray-400">
                  {(
                    (size /
                      Object.values(languages).reduce((a, b) => a + b, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* README */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">README</h2>
          <div className="border dark:border-gray-800">
            <div
              className="p-6 prose dark:prose-invert prose-pre:rounded-none max-w-none 
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
                prose-headings:border-b prose-headings:border-gray-200 dark:prose-headings:border-gray-800
                prose-a:text-blue-600 dark:prose-a:text-blue-400
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700
                prose-blockquote:pl-4 prose-blockquote:py-1
                prose-code:before:content-none prose-code:after:content-none
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                prose-code:text-gray-800 dark:prose-code:text-gray-200
                prose-code:px-1 prose-code:rounded-none
                [&_pre]:!bg-gray-100 [&_pre]:dark:!bg-gray-800
                [&_code]:!bg-gray-100 [&_code]:dark:!bg-gray-800
                [&_*]:!rounded-none"
            >
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
