"use client";

import { useQuery } from "@tanstack/react-query";
import { Repository } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, GitFork, ExternalLink } from "lucide-react";

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="truncate">{project.name}</span>
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <Badge variant="secondary">{project.language}</Badge>
                    <span className="flex items-center space-x-1">
                      <Star size={16} />
                      <span>{project.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork size={16} />
                      <span>{project.forks_count}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
}
