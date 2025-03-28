import Match from "@/data-service/models/Match";
import { ensureDatabaseInitialized } from "@/lib/db-init";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await ensureDatabaseInitialized();
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
