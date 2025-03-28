import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Match = sequelize.define("Match", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  team1Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  team2Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM("upcoming", "live", "completed"),
    defaultValue: "upcoming",
  },
  tossWinner: {
    type: DataTypes.INTEGER,
  },
  tossDecision: {
    type: DataTypes.ENUM("bat", "field"),
  },
  motm: {
    type: DataTypes.INTEGER,
  },
  team1Runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  team1Wickets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  team2Runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  team2Wickets: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  winner: {
    type: DataTypes.INTEGER,
    references: {
      model: "Teams",
      key: "id",
    },
  },
});

export default Match;
