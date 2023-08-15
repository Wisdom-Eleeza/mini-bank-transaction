import { Request, Response } from "express";
import { getRepository } from 'typeorm'
import { Customer } from "../models/Customer";

const Customers = async (req: Request, res: Response) => {
  try {
    const customerRepo = getRepository(Customer);
    const customers = await customerRepo.find({});
    // console.log("object", customers)
    return res.status(200).json(customers);
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

export default Customers;
