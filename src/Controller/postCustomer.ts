import { Request, Response } from "express";
import { Customer } from "../models/Customer";
console.log("Customer", Customer)
const CreateCustomer = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstname, lastname, card_number } = req.body;
    console.log("Request Body:", req.body);
    const customer = Customer.create({
      username,
      email,
      password,
      firstname,
      lastname,
      card_number,
    });

    await customer.save();
    
    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

export default CreateCustomer;
