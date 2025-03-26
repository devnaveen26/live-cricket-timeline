import Match from "@/data-service/models/Match";
import { Match as MatchType } from "@/lib/types";
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

    const matches = await Match.findAll({ where: { teamId } });
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const reqMatch: MatchType = await request.json();

    if (!reqMatch.team1Id || !reqMatch.team2Id || !reqMatch.date || !reqMatch.venue) {
      return NextResponse.json(
        { error: "team1Id, team2Id, date and venue are required" },
        { status: 400 }
      );
    }

    const match = await Match.create(reqMatch);

    return NextResponse.json(match);
  } catch (error) {
    console.error("Error creating match:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const reqMatch: MatchType = await request.json();

    if (!reqMatch.id) {
      return NextResponse.json(
        { error: "Match ID is required" },
        { status: 400 }
      );
    }

    const match = await Match.findByPk(reqMatch.id);

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    await match.update(reqMatch);

    return NextResponse.json(match);
  } catch (error) {
    console.error("Error updating match:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Match ID is required" },
        { status: 400 }
      );
    }

    const match = await Match.findByPk(id);

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    await match.destroy();
    return NextResponse.json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Error deleting match:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const reqMatch: MatchType = await request.json();

    if (!reqMatch.id) {
      return NextResponse.json(
        { error: "Match ID is required" },
        { status: 400 }
      );
    }

    const match = await Match.findByPk(reqMatch.id);

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    await match.update(reqMatch);
    return NextResponse.json(match);
  } catch (error) {
    console.error("Error updating match:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
