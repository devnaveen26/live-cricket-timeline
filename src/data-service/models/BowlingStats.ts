import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const BowlingStats = sequelize.define("BowlingStats", {
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
  overs: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  maidens: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  wickets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  economy: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  strikeRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  average: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  isCurrentlyBowling: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  currentSpell: {
    type: DataTypes.JSON, // Array of ball details in current spell
  },
});

export default BowlingStats;
