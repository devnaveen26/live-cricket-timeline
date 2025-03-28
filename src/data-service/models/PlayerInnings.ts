import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const PlayerInnings = sequelize.define("PlayerInnings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inning: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[1, 2]],
    },
  },
  runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  ballsFaced: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fours: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  sixes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  strikeRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  isNotOut: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  dismissalType: {
    type: DataTypes.STRING, // e.g., "Bowled", "Caught", "LBW", "Run Out"
  },
  dismissedBy: {
    type: DataTypes.INTEGER, // Player ID who took the wicket
  },
  battingPosition: {
    type: DataTypes.INTEGER,
  },
  startTime: {
    type: DataTypes.DATE,
  },
  endTime: {
    type: DataTypes.DATE,
  },
});

export default PlayerInnings; 