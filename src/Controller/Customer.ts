import express, { Request, Response } from "express";
import { getRepository } from 'typeorm'
import { Customer as CustomerModel } from "../models/Customer"; // Rename the import

const Customer = async (req: Request, res: Response) => {
  try {
    const customerRepo = getRepository(CustomerModel); // Use CustomerModel here
    const customers = await customerRepo.find({});
    return res.status(200).json(customers);
  } catch (error) {
    console.error("Something went wrong", error);
    return res.status(500).json({ error: "An error occurred" }); // Sending a response instead of throwing an error
  }
};

export default Customer;
