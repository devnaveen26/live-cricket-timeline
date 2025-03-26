import { initializeDatabase } from "./data-service/initDb";

// Initialize database before starting the server
initializeDatabase()
  .then(() => {
    console.log("Database initialized successfully");
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
