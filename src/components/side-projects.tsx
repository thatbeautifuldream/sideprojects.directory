"use client";

import { useQuery } from "@tanstack/react-query";
import { Repository } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Removed CardTitle import
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, GitFork } from "lucide-react";

const fetchSideProjects = async (): Promise<Repository[]> => {
  const response = await fetch("/api/side-projects");
  return response.json();
};

export default function SideProjects() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sideProjects"],
    queryFn: fetchSideProjects,
  });

  if (error) return <div className="text-red-500">Error fetching projects</div>;

  return (
    <div className="bg-background text-foreground mt-8">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-card">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))
          : projects?.map((project) => (
              <Card key={project.name} className="bg-card">
                <CardHeader className="pb-2">
                  <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center w-full gap-2">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-muted-foreground hover:text-primary truncate max-w-full xs:max-w-[70%]"
                    >
                      {project.name}
                    </a>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        <span>{project.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork size={16} />
                        <span>{project.forks_count}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className="px-2 py-1 rounded-full text-xs"
                    >
                      {project.language}
                    </Badge>
                    <div className="flex flex-wrap items-center gap-1">
                      {project.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="px-2 py-1 rounded-full text-xs"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
