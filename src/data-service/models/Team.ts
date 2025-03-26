import { DataTypes } from "sequelize";
import sequelize from "../config";

const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
  },
  primaryColor: {
    type: DataTypes.STRING,
  },
  secondaryColor: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  captain: {
    type: DataTypes.INTEGER,
  },
  homeGround: {
    type: DataTypes.STRING,
  },
  matches: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  won: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  lost: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tied: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  nrr: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

export default Team;
