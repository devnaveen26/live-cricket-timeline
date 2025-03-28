import { sequelize } from "@/data-service/db";
import { QueryTypes } from "sequelize";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const teams = await sequelize.query(
      `SELECT * FROM Teams ORDER BY points DESC, nrr DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );

    // Add position field based on order from query
    const leaderboard = teams.map((team: any, index: number) => ({
      position: index + 1,
      ...team,
    }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
