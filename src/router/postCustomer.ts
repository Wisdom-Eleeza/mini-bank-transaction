import express from "express";
import Customer from "../Controller/Customer";

const router = express()

router.post('/create-customer', Customer)
export default router