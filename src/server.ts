import express from "express";
import { createConnection } from "typeorm";
import { join } from "path"; // Import the 'join' function from the 'path' module

const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "mini-bank-project",
      synchronize: true,
      entities: [join(__dirname, "entities", "*{.js,.ts}")], // Use 'join' to construct the correct path
    });
    console.log("Postgres Database Connected Successfully...");
  } catch (error) {
    throw new Error("Unable to connect to the PostgreSQL database");
  }

  app.listen(port, () =>
    console.log(`Server started on: http://localhost:${port}`)
  );
};

startServer();
