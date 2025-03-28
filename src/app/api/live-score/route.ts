import { NextResponse } from "next/server";
import LiveScore from "@/data-service/models/LiveScore";
import { LiveScore as LiveScoreType } from "@/lib/types";
import { ensureDatabaseInitialized } from "@/lib/db-init";

export async function POST(request: Request) {
  try {
    await ensureDatabaseInitialized();
    const reqLiveScore: LiveScoreType = await request.json();

    if (
      !reqLiveScore.matchId ||
      !reqLiveScore.battingTeamId ||
      !reqLiveScore.bowlingTeamId
    ) {
      return NextResponse.json(
        { error: "matchId, battingTeamId and bowlingTeamId are required" },
        { status: 400 }
      );
    }

    const liveScore = await LiveScore.create(reqLiveScore);

    return NextResponse.json(liveScore);
  } catch (error) {
    console.error("Error creating live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
