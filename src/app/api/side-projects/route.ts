import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function GET() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    // Use the search.repos endpoint to find repositories with the 'side-project' topic
    const { data } = await octokit.search.repos({
      q: "topic:side-project user:thatbeautifuldream",
      per_page: 100,
    });

    // Extract repositories from search results
    const repositories = data.items;

    return NextResponse.json(repositories);
  } catch (error) {
    console.error("Error fetching side projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
