import { initializeDatabase } from "./data-service/db";

// Initialize database before starting the server
initializeDatabase()
  .then(() => {
    console.log("Server.ts: Database initialized successfully");
  })
  .catch((error) => {
    console.error("Server.ts: Failed to initialize database:", error);
    process.exit(1);
  });
