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

    // const schedules = await Schedule.findAll({ where: { teamId } });
    // to be implemented ::: get all matches for all team
    return NextResponse.json([
      {
        teamId: 1,
        teamName: "Team 1",
        matchesPlayed: 10,
      },
    ]);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
