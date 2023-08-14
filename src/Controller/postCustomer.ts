import express, { Request, Response } from "express";
import { Customer as CustomerModel } from "../models/Customer";

const CreateCustomer = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstname, lastname, card_number } = req.body;
    console.log("Request Body:", req.body); // Log the request body

    const customer = CustomerModel.create({
      username,
      email,
      password,
      firstname,
      lastname,
      card_number,
    });

    await customer.save();
    console.log("Saved Customer:", customer); // Log the saved customer

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error creating customer:", error); // Log the error
    return res.status(500).json({ error: "An error occurred" });
  }
};

export default CreateCustomer;
