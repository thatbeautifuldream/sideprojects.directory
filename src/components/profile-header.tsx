/* eslint-disable @next/next/no-img-element */
import { Avatar } from "@/components/ui/avatar";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { ArrowUpRight } from "lucide-react";

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
              "bg-background border shadow-sm",
              "hover:text-primary transition-colors"
            )}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="text-center space-y-4">
          <div>
            <h1
              className={`text-3xl font-bold text-foreground ${instrumentSerif.className}`}
            >
              {owner.login}
            </h1>
            {/* <p className="text-muted-foreground text-sm mt-1">
              {owner.type} {owner.site_admin && "• Admin"}
            </p> */}
          </div>

          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-foreground">
                  {owner.followers}
                </span>
                <span className="text-xs text-muted-foreground">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-foreground">
                  {owner.following}
                </span>
                <span className="text-xs text-muted-foreground">Following</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
