import { DataTypes } from "sequelize";
import sequelize from "../config";

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
});

export default Match;
