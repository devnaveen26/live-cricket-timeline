import { DataTypes } from "sequelize";
import sequelize from "../config";

const NewsItem = sequelize.define("NewsItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default NewsItem;
