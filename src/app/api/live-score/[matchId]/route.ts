import { LiveScore, Match, Team, Player } from "@/data-service/db";
import { NextResponse } from "next/server";
import { ensureDatabaseInitialized } from "@/lib/db-init";

export async function GET(
  request: Request,
  { params }: { params: { matchId: string } }
) {
  try {
    await ensureDatabaseInitialized();
    const { matchId } = params;

    if (!matchId) {
      return NextResponse.json(
        { error: "matchId is required" },
        { status: 400 }
      );
    }

    // Get latest live score data
    const liveScore = await LiveScore.findOne({
      where: { matchId },
      order: [["createdAt", "DESC"]],
    });

    if (!liveScore) {
      return NextResponse.json(
        { error: "Live score not found" },
        { status: 404 }
      );
    }

    // Get the raw values to access properties
    const liveScoreData = liveScore.get({ plain: true });

    // Get additional data
    const match = await Match.findByPk(liveScoreData.matchId, {
      attributes: [
        "id",
        "venue",
        "date",
        "status",
        "team1Id",
        "team2Id",
        "winner",
        "tossWinner",
      ],
    });

    const battingTeam = await Team.findByPk(liveScoreData.battingTeamId, {
      attributes: ["id", "name", "shortName"], // shortName doesn't exist in Team model
    });

    const bowlingTeam = await Team.findByPk(liveScoreData.bowlingTeamId, {
      attributes: ["id", "name", "shortName"], // shortName doesn't exist in Team model
    });

    const currentBatsman = liveScoreData.currentBatsmenId
      ? await Player.findByPk(liveScoreData.currentBatsmenId, {
          attributes: ["id", "name"], // runs and balls don't exist in Player model
        })
      : null;

    const currentBowler = liveScoreData.currentBowlerId
      ? await Player.findByPk(liveScoreData.currentBowlerId, {
          attributes: ["id", "name"], // wickets and overs don't exist in Player model
        })
      : null;

    const enhancedLiveScore = {
      ...liveScoreData,
      Match: match,
      BattingTeam: battingTeam,
      BowlingTeam: bowlingTeam,
      CurrentBatsman: currentBatsman,
      CurrentBowler: currentBowler,
    };

    return NextResponse.json(enhancedLiveScore);
  } catch (error) {
    console.error("Error fetching live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { matchId: string } }
) {
  try {
    await ensureDatabaseInitialized();
    const matchId = params.matchId;

    // Find the latest live score entry for this match
    const liveScore = await LiveScore.findOne({
      where: { matchId },
      order: [["createdAt", "DESC"]],
    });

    if (!liveScore) {
      return NextResponse.json(
        { error: "No live score found for this match" },
        { status: 404 }
      );
    }

    // Delete the entry
    await liveScore.destroy();

    return NextResponse.json({
      message: "Live score entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { matchId: string } }
) {
  try {
    await ensureDatabaseInitialized();
    const matchId = params.matchId;
    const updates = await request.json();

    // Find the latest live score entry for this match
    const liveScore = await LiveScore.findOne({
      where: { matchId },
      order: [["createdAt", "DESC"]],
    });

    if (!liveScore) {
      return NextResponse.json(
        { error: "No live score found for this match" },
        { status: 404 }
      );
    }

    // Update the entry
    await liveScore.update(updates);

    return NextResponse.json({
      message: "Live score updated successfully",
      liveScore,
    });
  } catch (error) {
    console.error("Error updating live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
