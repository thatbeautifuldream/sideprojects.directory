/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface Repository {
  id: number;
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  language: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
}

const fetchProjects = async (): Promise<Repository[]> => {
  const response = await fetch("/api/all-side-projects");
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
};

export default function ProjectGrid() {
  const {
    data: projects,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (error)
    return (
      <div className="text-red-500 text-center">Failed to load projects</div>
    );

  return (
    <div className="bg-background text-foreground">
      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center mb-8">
          <div className="text-sm animate-pulse text-muted-foreground">
            Fetching side projects...
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isSuccess &&
          projects?.map((project) => (
            <Card key={project.id} className="bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <img
                      src={project.owner.avatar_url}
                      alt={project.owner.login}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-muted-foreground hover:text-primary truncate"
                      >
                        {project.name}
                      </a>
                      <p className="text-sm text-muted-foreground">
                        by {project.owner.login}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {project.stars}
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                      </svg>
                      {project.forks}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description || "No description available"}
                </p>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {project.language && (
                    <Badge
                      variant="outline"
                      className="px-2 py-1 rounded-full text-xs shrink-0"
                    >
                      {project.language}
                    </Badge>
                  )}
                  {project.topics?.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="px-2 py-1 rounded-full text-xs shrink-0"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
