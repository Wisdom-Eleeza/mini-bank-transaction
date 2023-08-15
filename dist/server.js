"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const cors = require('cors');
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const Customer_1 = __importDefault(require("./router/Customer"));
const postCustomer_1 = __importDefault(require("./router/postCustomer"));
const post_bankers_1 = __importDefault(require("./router/post_bankers"));
const get_bankers_1 = __importDefault(require("./router/get_bankers"));
// import getTransaction from './router/get_all-Transactions'
const postTransactions_1 = __importDefault(require("./router/postTransactions"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Database connection
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: true,
            entities: [(0, path_1.join)(__dirname, "models", "*.js"), (0, path_1.join)(__dirname, "models", "*.ts")],
            // entities: [Customer]
        });
        console.log("Postgres Database Connected Successfully...");
    }
    catch (error) {
        console.error('Error connecting to PostgreSQL database:', error);
        throw new Error("Unable to connect to the PostgreSQL database");
    }
    // in-built middleware
    app.use(cors());
    app.use(express_1.default.json());
    // routes middleware
    app.use('/api/v1', Customer_1.default);
    app.use('/api/v1', postCustomer_1.default);
    app.use('/api/v1', post_bankers_1.default);
    app.use('/api/v1', get_bankers_1.default);
    // app.use('/api/v1', getTransaction)
    app.use('/api/v1/customer', postTransactions_1.default);
    // error handling middleware
    app.use(errorHandler_1.default);
    app.listen(port, () => console.log(`Server started on: http://localhost:${port}`));
});
startServer();
