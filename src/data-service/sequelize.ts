import path from "path";
import fs from "fs";
import sqlite3 from "sqlite3";
import { Sequelize } from "sequelize";

// Ensure the database directory exists
const dbDir = path.join(process.cwd(), "src", "data-service", "database");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create a new Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(dbDir, "test.sqlite"),
  logging: true,
  dialectModule: sqlite3,
  define: {
    timestamps: true,
    underscored: true,
  }
});

export default sequelize; 