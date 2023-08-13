import express from "express";
import Customer from "../Controller/Customer";

const router = express()

router.get('/customer', Customer)
export default router