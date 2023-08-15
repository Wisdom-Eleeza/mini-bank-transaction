import express from "express";
import Banker from "../Controller/post_bankers";

const router = express()

router.post('/create-bankers', Banker)
export default router