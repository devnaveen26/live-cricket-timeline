import Match from "@/data-service/models/Match";
import { ensureDatabaseInitialized } from "@/lib/db-init";
import { Match as MatchType } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await ensureDatabaseInitialized();
    const matches = await Match.findAll();
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
    await ensureDatabaseInitialized();
    const reqMatch: MatchType = await request.json();

    if (
      !reqMatch.team1Id ||
      !reqMatch.team2Id ||
      !reqMatch.date ||
      !reqMatch.venue
    ) {
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
    await ensureDatabaseInitialized();
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

export async function PATCH(request: Request) {
  try {
    await ensureDatabaseInitialized();
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
