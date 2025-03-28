import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Player = sequelize.define("Player", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
  },
  battingStyle: {
    type: DataTypes.STRING,
  },
  bowlingStyle: {
    type: DataTypes.STRING,
  },
  nationality: {
    type: DataTypes.STRING,
    defaultValue: "Indian"
  },
  age: {
    type: DataTypes.INTEGER,
  },
  matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  runs: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  highestScore: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  average: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  strikeRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  fifties: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  hundreds: {
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
  bestBowling: {
    type: DataTypes.STRING,
  },
});

export default Player;
