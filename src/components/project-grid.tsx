/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { allSideProjects } from "@/data";
import { motion } from "framer-motion";
import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";

// interface Repository {
//   id: number;
//   name: string;
//   description: string;
//   stars: number;
//   forks: number;
//   url: string;
//   language: string;
//   topics: string[];
//   owner: {
//     login: string;
//     avatar_url: string;
//   };
//   created_at: string;
//   updated_at: string;
// }

// const fetchProjects = async (): Promise<Repository[]> => {
//   const response = await fetch("/api/all-side-projects");
//   if (!response.ok) throw new Error("Failed to fetch projects");
//   return response.json();
// };

export default function ProjectGrid() {
  // const {
  //   data: projects,
  //   isLoading,
  //   isSuccess,
  //   error,
  // } = useQuery({
  //   queryKey: ["projects"],
  //   queryFn: fetchProjects,
  // });

  const projects = allSideProjects;
  const isLoading = false;
  const isSuccess = true;
  const error = null;

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  if (error)
    return (
      <div className="text-red-500 text-center">Failed to load projects</div>
    );

  return (
    <div className="bg-background text-foreground">
      {isLoading && (
        <div className="flex flex-col gap-3 justify-center items-center mb-8">
          <div className="~text-sm animate-pulse text-muted-foreground">
            Fetching side projects...
          </div>
        </div>
      )}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isSuccess &&
          projects?.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="bg-card h-[200px] flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <img
                        src={project.owner.avatar_url}
                        alt={project.owner.login}
                        width={38}
                        height={38}
                        className="rounded-full"
                      />
                      <div>
                        <Link
                          href={`/${project.owner.login}/${project.name}`}
                          className="text-lg text-muted-foreground hover:text-primary truncate"
                        >
                          {project.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          by{" "}
                          <Link
                            href={`/${project.owner.login}`}
                            className="hover:text-primary"
                          >
                            {project.owner.login}
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="flex lg:flex-row flex-col items-end lg:items-center lg:space-x-4 lg:space-y-0 space-y-1 text-muted-foreground text-sm lg:text-base">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stars}
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1.5"
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
                <CardContent className="flex flex-col flex-grow justify-between pt-2">
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {project.description || "No description available"}
                  </p>
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar mt-auto">
                    {project.language && (
                      <Badge
                        variant="outline"
                        className="px-3 py-1 rounded-full text-xs shrink-0"
                      >
                        {project.language}
                      </Badge>
                    )}
                    {project.topics?.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="px-3 py-1 rounded-full text-xs shrink-0"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}
