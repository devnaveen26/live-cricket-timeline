import { ensureDatabaseInitialized } from "@/lib/db-init";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await ensureDatabaseInitialized();
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    // to be implemented::: PLayer of the tournament, BEst bowler, batsman
    return NextResponse.json([
      {
        id: 1,
        image: "https://via.placeholder.com/150",
        caption: "Caption 1",
        date: "2023-01-01",
        tags: ["tag1", "tag2"],
        matchId: 1,
      },
    ]);
  } catch (error) {
    console.error("Error fetching Gallery:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
