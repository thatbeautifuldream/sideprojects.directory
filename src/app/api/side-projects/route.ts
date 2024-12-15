import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function GET(request: Request) {
  // Extract the username from the query parameters
  const url = new URL(request.url);
  const username = url.searchParams.get("username") || "thatbeautifuldream";

  const octokit = new Octokit();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // Use the search.repos endpoint to find repositories with the 'side-project' topic for the provided username or default to thatbeautifuldream
    const { data } = await octokit.search.repos({
      q: `topic:side-project user:${username}`,
      per_page: 100,
    });

    // Extract repositories from search results
    const repositories = data.items;

    return NextResponse.json(repositories);
  } catch (error) {
    console.error("Error fetching side projects for user:", username, error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
