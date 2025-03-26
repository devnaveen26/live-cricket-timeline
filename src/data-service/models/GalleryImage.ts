import { DataTypes } from "sequelize";
import sequelize from "../config";

const GalleryImage = sequelize.define("GalleryImage", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  tags: {
    type: DataTypes.JSON, // Storing array of strings
    defaultValue: [],
  },
  matchId: {
    type: DataTypes.INTEGER,
  },
});

export default GalleryImage;
