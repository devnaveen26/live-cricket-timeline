import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const SponsorAd = sequelize.define("SponsorAd", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("main", "partner", "associate"),
    allowNull: false,
  },
});

export default SponsorAd;
