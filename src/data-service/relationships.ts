import Team from "./models/Team";
import Player from "./models/Player";
import Match from "./models/Match";
import LiveScore from "./models/LiveScore";
import GalleryImage from "./models/GalleryImage";

// Team relationships
Team.hasMany(Player, { foreignKey: "teamId" });
Player.belongsTo(Team, { foreignKey: "teamId" });

Team.hasMany(Match, { foreignKey: "team1Id", as: "HomeMatches" });
Team.hasMany(Match, { foreignKey: "team2Id", as: "AwayMatches" });
Match.belongsTo(Team, { foreignKey: "team1Id", as: "Team1" });
Match.belongsTo(Team, { foreignKey: "team2Id", as: "Team2" });

// Match relationships
Match.hasOne(LiveScore, { foreignKey: "matchId" });
LiveScore.belongsTo(Match, { foreignKey: "matchId" });

Match.hasMany(GalleryImage, { foreignKey: "matchId" });
GalleryImage.belongsTo(Match, { foreignKey: "matchId" }); 