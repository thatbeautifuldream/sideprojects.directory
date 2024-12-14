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

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface RepoStatsModalProps {
  stargazersUrl: string;
  forksUrl: string;
  type: "stars" | "forks";
  count: number;
}

const fetchUsers = async (url: string): Promise<User[]> => {
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

  const { data: users, isLoading } = useQuery({
    queryKey: [type, url],
    queryFn: () => fetchUsers(url),
    enabled: open, // Only fetch when modal is open
  });

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
          ) : users?.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No {type} yet
            </div>
          ) : (
            <div className="grid gap-4">
              {users?.map((user) => (
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
                  <span className="font-medium hover:underline">
                    {user.login}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
