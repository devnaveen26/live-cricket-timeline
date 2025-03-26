import { DataTypes } from "sequelize";
import sequelize from "../config";

const LiveScore = sequelize.define("LiveScore", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inning: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[1, 2]],
    },
  },
  battingTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bowlingTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalRuns: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  wickets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  overs: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  currentBatsmen: {
    type: DataTypes.JSON,
  },
  currentBowler: {
    type: DataTypes.INTEGER,
  },
  recentBalls: {
    type: DataTypes.JSON,
  },
  requiredRunRate: {
    type: DataTypes.FLOAT,
  },
  requiredRuns: {
    type: DataTypes.INTEGER,
  },
  remainingBalls: {
    type: DataTypes.INTEGER,
  },
});

export default LiveScore;
