import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    // const leaderboard = await Leaderboard.findAll({ where: { teamId } });
    // to be implemented ::: Calculation from matches table
    return NextResponse.json([
      {
        teamId: 1,
        teamName: "Team 1",
        matchesPlayed: 10,
        matchesWon: 6,
        matchesLost: 4,
        points: 12,
        position: 1,
      },
    ]);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
