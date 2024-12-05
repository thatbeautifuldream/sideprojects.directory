"use client";

import { useQuery } from "@tanstack/react-query";
import { Repository } from "@/types";

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching projects</div>;

  return (
    <div>
      {projects?.map((project) => (
        <div key={project.name}>
          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
            {project.name}
          </a>
          <p>{project.description}</p>
          <span>
            {project.language} ⭐ {project.stargazers_count}
          </span>
        </div>
      ))}
    </div>
  );
}
