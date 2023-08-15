import { Request, Response } from "express";
import { getRepository } from 'typeorm'
import { Banker } from "../models/Banker";

const Bankers = async (req: Request, res: Response) => {
try {
    const bankers = await getRepository(Banker).find()

    return res.status(200).json(bankers)
} catch (error) {
    console.error('something went wrong', error)
    return res.send(error)
}
};

export default Bankers;
