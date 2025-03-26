import { NextResponse } from "next/server";
import LiveScore from "@/data-service/models/LiveScore";
import { LiveScore as LiveScoreType } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get("matchId");

    if (!matchId) {
      return NextResponse.json(
        { error: "matchId is required" },
        { status: 400 }
      );
    }

    const liveScore = await LiveScore.findAll({ where: { matchId } });
    return NextResponse.json(liveScore);
  } catch (error) {
    console.error("Error fetching live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

export async function PUT(request: Request) {
  try {
    const reqLiveScore: LiveScoreType = await request.json();

    if (!reqLiveScore.matchId) {
      return NextResponse.json(
        { error: "matchId is required" },
        { status: 400 }
      );
    }

    const liveScore = await LiveScore.findByPk(reqLiveScore.matchId);

    if (!liveScore) {
      return NextResponse.json(
        { error: "Live score not found" },
        { status: 404 }
      );
    }

    await liveScore.update(reqLiveScore);

    return NextResponse.json(liveScore);
  } catch (error) {
    console.error("Error updating live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { matchId } = await request.json();

    if (!matchId) {
      return NextResponse.json(
        { error: "matchId is required" },
        { status: 400 }
      );
    }

    const liveScore = await LiveScore.findByPk(matchId);

    if (!liveScore) {
      return NextResponse.json(
        { error: "Live score not found" },
        { status: 404 }
      );
    }

    await liveScore.destroy();
    return NextResponse.json({ message: "Live score deleted successfully" });
  } catch (error) {
    console.error("Error deleting live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const reqLiveScore: LiveScoreType = await request.json();

    if (!reqLiveScore.matchId) {
      return NextResponse.json(
        { error: "matchId is required" },
        { status: 400 }
      );
    }

    const liveScore = await LiveScore.findByPk(reqLiveScore.matchId);

    if (!liveScore) {
      return NextResponse.json(
        { error: "Live score not found" },
        { status: 404 }
      );
    }

    await liveScore.update(reqLiveScore);
    return NextResponse.json(liveScore);
  } catch (error) {
    console.error("Error updating live score:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
