"use client";

import { useQuery } from "@tanstack/react-query";
import { Repository } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RepoStatsModal } from "./repo-stats-modal";

const fetchSideProjects = async (username: string): Promise<Repository[]> => {
  const response = await fetch(`/api/side-projects?username=${username}`);
  return response.json();
};

export default function SideProjects({ username }: { username?: string }) {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sideProjects", username],
    queryFn: () => fetchSideProjects(username ?? "thatbeautifuldream"),
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
                      <RepoStatsModal
                        stargazersUrl={project.stargazers_url}
                        forksUrl={project.forks_url}
                        type="stars"
                        count={project.stargazers_count}
                      />
                      <RepoStatsModal
                        stargazersUrl={project.stargazers_url}
                        forksUrl={project.forks_url}
                        type="forks"
                        count={project.forks_count}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
                    <Badge
                      variant="outline"
                      className="px-2 py-1 rounded-full text-xs shrink-0"
                    >
                      {project.language}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {project.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="px-2 py-1 rounded-full text-xs whitespace-nowrap shrink-0"
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
