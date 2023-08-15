import express from "express";
import { createConnection } from "typeorm";
const cors = require('cors')
import dotenv from 'dotenv'
import { join } from "path";

import CustomerRoutes from "./router/Customer";
import createCustomerRouter from "./router/postCustomer"
import postBankersRouter from './router/post_bankers'
import getBankersRouter from './router/get_bankers'
// import getTransaction from './router/get_all-Transactions'
import createTransaction from "./router/postTransactions";
import errorHandlerMiddleware from "./middleware/errorHandler";

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
      entities: [join(__dirname, "models", "*.js"), join(__dirname, "models", "*.ts")],
    // entities: [Customer]
    });
    console.log("Postgres Database Connected Successfully...");
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
    throw new Error("Unable to connect to the PostgreSQL database");
  }
  // in-built middleware
  app.use(cors())
  app.use(express.json())

  // routes middleware
  app.use('/api/v1', CustomerRoutes)
  app.use('/api/v1', createCustomerRouter)
  app.use('/api/v1', postBankersRouter)
  app.use('/api/v1', getBankersRouter)
  // app.use('/api/v1', getTransaction)
  app.use('/api/v1/customer', createTransaction)

  // error handling middleware
  app.use(errorHandlerMiddleware)

  app.listen(port, () =>
    console.log(`Server started on: http://localhost:${port}`)
  );
};

startServer();
