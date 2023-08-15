import express from "express";
import Transaction from "../Controller/postTransaction";

const router = express()

router.post('/:customerId/transaction', Transaction)
export default router