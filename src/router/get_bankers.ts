import express from "express";
import Banker from "../Controller/get_bankers";

const router = express()

router.get('/bankers', Banker)
export default router