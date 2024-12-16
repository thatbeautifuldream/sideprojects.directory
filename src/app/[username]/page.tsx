import SideProjects from "@/components/side-projects";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;

  return <div>{username && <SideProjects username={username} />}</div>;
}
