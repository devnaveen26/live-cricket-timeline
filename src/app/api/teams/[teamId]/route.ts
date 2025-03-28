import { Team, Player } from "@/data-service/db";
import { Team as TeamType } from "@/lib/types";
import { NextResponse } from "next/server";
import { Model } from "sequelize";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const teamId = params.teamId;

    if (!teamId) {
      return NextResponse.json(
        { error: "Team ID is required" },
        { status: 400 }
      );
    }

    const team = await Team.findByPk(teamId) as Model<TeamType>;

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const players = await Player.findAll({
      where: {
        teamId: team.getDataValue('id')
      }
    });

    const response = {
      ...team.toJSON(),
      players
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
