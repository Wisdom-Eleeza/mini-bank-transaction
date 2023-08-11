import express from "express";
import { createConnection } from "typeorm";
import dotenv from 'dotenv'
import { join } from "path"; // Import the 'join' function from the 'path' module

import CustomerRoutes from "./router/Customer";

dotenv.config()
const app = express();
const port = process.env.PORT || 4000;

// Database connection
const startServer = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      entities: [join(__dirname, "entities", "*{.js,.ts}")], // Use 'join' to construct the correct path
    });
    console.log("Postgres Database Connected Successfully...");
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
    throw new Error("Unable to connect to the PostgreSQL database");
  }

  // routes middleware
  app.use('/customer', CustomerRoutes)

  app.listen(port, () =>
    console.log(`Server started on: http://localhost:${port}`)
  );
};

startServer();
