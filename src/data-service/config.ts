import { Sequelize } from "sequelize";
import path from "path";
import fs from "fs";

// Ensure the database directory exists
const dbDir = path.join(process.cwd(), "src", "data-service", "database");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(dbDir, "test.sqlite"),
  logging: false,
  dialectModule: require("sqlite3"),
});

// Add this method to handle connection
export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    await sequelize.sync({ alter: true }); // This will create tables if they don't exist
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default sequelize;
