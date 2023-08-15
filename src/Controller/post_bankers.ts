import { Request, Response } from "express";
import { Banker } from "../models/Banker";

const CreateBanker = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstname, lastname, address, card_number, employee_number } = req.body;
    console.log("Request Body:", req.body); // Log the request body

    const banker = Banker.create({
      username,
      email,
      password,
      address,
      firstname,
      lastname,
      card_number,
      employee_number
    });

    await banker.save(); // Save the instance
    console.log("Saved Banker:", banker); // Log the saved banker

    return res.status(200).json(banker);
  } catch (error) {
    console.error("Error creating banker:", error); // Log the error
    return res.status(500).json({ error: "An error occurred" });
  }
};

export default CreateBanker;
