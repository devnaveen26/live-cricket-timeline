import sequelize from "./sequelize";
import Team from "./models/Team";
import Player from "./models/Player";
import Match from "./models/Match";
import LiveScore from "./models/LiveScore";
import GalleryImage from "./models/GalleryImage";

// Define relationships
const setupRelationships = () => {
  // Team relationships
  Team.hasMany(Player, { foreignKey: "teamId" });
  Player.belongsTo(Team, { foreignKey: "teamId" });

  Team.hasMany(Match, { foreignKey: "team1Id", as: "HomeMatches" });
  Team.hasMany(Match, { foreignKey: "team2Id", as: "AwayMatches" });
  Match.belongsTo(Team, { foreignKey: "team1Id", as: "Team1" });
  Match.belongsTo(Team, { foreignKey: "team2Id", as: "Team2" });
  Match.belongsTo(Team, { foreignKey: "winner", as: "WinningTeam" });
  Match.belongsTo(Team, { foreignKey: "tossWinner", as: "TossWinningTeam" });
  Match.belongsTo(Player, { foreignKey: "motm", as: "ManOfTheMatch" });

  // Match relationships
  Match.hasOne(LiveScore, { foreignKey: "matchId" });
  LiveScore.belongsTo(Match, { foreignKey: "matchId" });

  // LiveScore relationships
  LiveScore.belongsTo(Team, { foreignKey: "battingTeamId", as: "BattingTeam" });
  LiveScore.belongsTo(Team, { foreignKey: "bowlingTeamId", as: "BowlingTeam" });
  LiveScore.belongsTo(Player, { foreignKey: "currentBatsmenId", as: "CurrentBatsman" });
  LiveScore.belongsTo(Player, { foreignKey: "currentBowlerId", as: "CurrentBowler" });

  Match.hasMany(GalleryImage, { foreignKey: "matchId" });
  GalleryImage.belongsTo(Match, { foreignKey: "matchId" });
};

// Initialize database and set up relationships
export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "db.ts: Database connection has been established successfully."
    );

    // Set up relationships
    setupRelationships();

    await sequelize.sync({ force: true, alter: true });
    console.log("db.ts: Database synchronized successfully.");
  } catch (error) {
    console.error("db.ts: Unable to connect to the database:", error);
    throw error;
  }
};

export { sequelize, Team, Player, Match, LiveScore, GalleryImage };
