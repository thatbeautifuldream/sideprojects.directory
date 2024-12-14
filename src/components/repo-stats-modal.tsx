"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { GitFork, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface StargazerUser {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
}

interface ForkRepository {
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string;
}

interface RepoStatsModalProps {
  stargazersUrl: string;
  forksUrl: string;
  type: "stars" | "forks";
  count: number;
}

const fetchStargazers = async (url: string): Promise<StargazerUser[]> => {
  const response = await fetch(url);
  return response.json();
};

const fetchForks = async (url: string): Promise<ForkRepository[]> => {
  const response = await fetch(url);
  return response.json();
};

export function RepoStatsModal({
  stargazersUrl,
  forksUrl,
  type,
  count,
}: RepoStatsModalProps) {
  const [open, setOpen] = useState(false);
  const url = type === "stars" ? stargazersUrl : forksUrl;

  const { data, isLoading } = useQuery<StargazerUser[] | ForkRepository[]>({
    queryKey: [type, url],
    queryFn: () => (type === "stars" ? fetchStargazers(url) : fetchForks(url)),
    enabled: open,
  });

  const renderUser = (user: StargazerUser) => (
    <a
      key={user.login}
      href={user.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
    >
      <Image
        src={user.avatar_url}
        alt={user.login ?? "User avatar"}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="font-medium hover:underline">{user.login}</span>
        <div className="flex gap-2 text-xs text-muted-foreground">
          {user.type !== "User" && (
            <span className="px-1.5 py-0.5 rounded-full bg-muted">
              {user.type}
            </span>
          )}
          {user.site_admin && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
              Admin
            </span>
          )}
        </div>
      </div>
    </a>
  );

  const renderFork = (fork: ForkRepository) => (
    <a
      key={fork.owner.login}
      href={fork.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
    >
      <Image
        src={fork.owner.avatar_url}
        alt={fork.owner.login ?? "User avatar"}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <span className="font-medium hover:underline">{fork.owner.login}</span>
        {fork.description && (
          <span className="text-sm text-muted-foreground">
            {fork.description}
          </span>
        )}
      </div>
    </a>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 hover:text-primary transition-colors">
          {type === "stars" ? <Star size={16} /> : <GitFork size={16} />}
          <span>{count}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "stars" ? (
              <>
                <Star size={20} /> Stargazers
              </>
            ) : (
              <>
                <GitFork size={20} /> Forks
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === "stars"
              ? "People who starred this repository"
              : "People who forked this repository"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : !data || data.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No {type} yet
            </div>
          ) : (
            <div className="grid gap-4">
              {type === "stars"
                ? (data as StargazerUser[]).map(renderUser)
                : (data as ForkRepository[]).map(renderFork)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
