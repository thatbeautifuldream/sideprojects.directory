/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { ArrowUpRight, Crown } from "lucide-react";
import Link from "next/link";

interface ProfileHeaderProps {
  owner: User;
}

export function ProfileHeader({ owner }: ProfileHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Avatar className="w-24 h-24 rounded-full ring-2 ring-primary/20 ring-offset-2">
            <img
              src={owner.avatar_url}
              alt={`${owner.login}'s avatar`}
              className="object-cover"
            />
          </Avatar>
          <a
            href={owner.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "absolute -top-2 -right-2 p-1.5 rounded-full",
              "bg-background border shadow-sm hover:text-primary transition-colors"
            )}
          >
            {owner.login === "thatbeautifuldream" ? (
              <Crown className="w-4 h-4" />
            ) : (
              <ArrowUpRight className="w-4 h-4" />
            )}
          </a>
        </div>

        <div className="text-center space-y-4">
          <div>
            <h1 className={`text-xl font-bold text-foreground`}>
              {owner.name}
            </h1>
            <Link
              href={`https://github.com/${owner.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary text-sm mt-1"
            >
              @{owner.login}{" "}
            </Link>
            <p className="text-muted-foreground text-sm mt-1">{owner.bio}</p>
            <p className="text-muted-foreground text-sm mt-1">
              {owner.location}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-6">
              <Link
                href={owner.followers_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="font-semibold text-foreground">
                  {owner.followers}
                </span>
                <span className="text-xs text-muted-foreground hover:text-primary">
                  Followers
                </span>
              </Link>
              <Link
                href={owner.following_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <span className="font-semibold text-foreground">
                  {owner.following}
                </span>
                <span className="text-xs text-muted-foreground hover:text-primary">
                  Following
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
