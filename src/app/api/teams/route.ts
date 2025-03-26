import Team from "@/data-service/models/Team";
import { Team as TeamType } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teams = await Team.findAll();
    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
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
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const team = await Team.findByPk(id);

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    await team.destroy();
    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const reqTeam: TeamType = await request.json();

    if (!reqTeam.name || !reqTeam.shortName) {
      return NextResponse.json(
        { error: "Name and shortName are required" },
        { status: 400 }
      );
    }

    const team = await Team.create(reqTeam);

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const reqTeam: TeamType = await request.json();

    if (!reqTeam.id) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const team = await Team.findByPk(reqTeam.id);

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    await team.update(reqTeam);

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const reqTeam: TeamType = await request.json();

  if (!reqTeam.id) {
    return NextResponse.json(
      { error: "Team ID is required" },
      { status: 400 }
    );
  }

  const team = await Team.findByPk(reqTeam.id);
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  await team.update(reqTeam);
  return NextResponse.json(team);
}
