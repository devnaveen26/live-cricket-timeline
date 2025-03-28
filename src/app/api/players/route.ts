import Player from "@/data-service/models/Player";
import { ensureDatabaseInitialized } from "@/lib/db-init";
import { Player as PlayerType } from "@/lib/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await ensureDatabaseInitialized();
    const players = await Player.findAll();
    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureDatabaseInitialized();
    const playerData: PlayerType = await request.json();

    if (!playerData.name) {
      return NextResponse.json(
        { error: "Player name is required" },
        { status: 400 }
      );
    }

    const player = await Player.create(playerData);
    return NextResponse.json(player);
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await ensureDatabaseInitialized();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Player ID is required" },
        { status: 400 }
      );
    }

    const player = await Player.findByPk(id);

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    await player.destroy();
    return NextResponse.json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await ensureDatabaseInitialized();
    const reqPlayer: PlayerType = await request.json();

    if (!reqPlayer.id) {
      return NextResponse.json(
        { error: "Player ID is required" },
        { status: 400 }
      );
    }

    const player = await Player.findByPk(reqPlayer.id);

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    await player.update(reqPlayer);
    return NextResponse.json(player);
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
