import Match from "@/data-service/models/Match";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const matches = await Match.findAll({
      order: [["date", "ASC"]],
    });

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
