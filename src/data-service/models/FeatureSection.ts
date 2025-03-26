import { DataTypes } from "sequelize";
import sequelize from "../config";

const FeatureSection = sequelize.define("FeatureSection", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtitle: {
    type: DataTypes.STRING,
  },
  icon: {
    type: DataTypes.STRING, // Storing icon reference/path
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default FeatureSection;
