import { NextResponse } from "next/server";
import octokit from "@/lib/octokit";

export async function GET(request: Request) {
  // Extract the owner and repo from the query parameters
  const url = new URL(request.url);
  const owner = url.searchParams.get("owner");
  const repo = url.searchParams.get("repo");

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Owner and repo parameters are required" },
      { status: 400 }
    );
  }

  try {
    // Fetch repository details
    const { data: repository } = await octokit.repos.get({
      owner,
      repo,
    });

    // Fetch additional repository data like languages and readme
    const [{ data: languages }, { data: readme }] = await Promise.all([
      octokit.repos.listLanguages({
        owner,
        repo,
      }),
      octokit.repos
        .getReadme({
          owner,
          repo,
          mediaType: {
            format: "raw",
          },
        })
        .catch(() => ({ data: null })), // Handle cases where readme doesn't exist
    ]);

    return NextResponse.json({
      repository,
      languages,
      readme,
    });
  } catch (error) {
    console.error(
      `Error fetching repository details for ${owner}/${repo}:`,
      error
    );
    return NextResponse.json(
      { error: "Failed to fetch repository details" },
      { status: 500 }
    );
  }
}
