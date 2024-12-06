"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import SideProjects from "@/components/side-projects";

export default function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setUsername(resolvedParams.username);
    });
  }, [params]);

  return (
    <div className="container font-mono mx-auto px-4 py-8">
      <Header />
      {username && <SideProjects username={username} />}
    </div>
  );
}
