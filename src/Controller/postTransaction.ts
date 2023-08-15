import { Request, Response } from "express";
import { Transaction, TransactionType } from "../models/Transaction";
import { Customer } from "../models/Customer";

const createTransaction = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const { type, amount } = req.body;

    // Find customer from customerId
    const customer = await Customer.findOne(parseInt(customerId));
    if (!customer)
      return res.status(400).json({ message: "Customer not found ...!" });

    const transaction = Transaction.create({
      type,
      amount,
      customer,
    });

    await transaction.save();

    //check the type of transaction
    if (type === TransactionType.DEPOSIT) {
      customer.balance = customer.balance + amount;
    } else if (type === TransactionType.WITHDRAW) {
      customer.balance = customer.balance - amount;
    }
    await customer.save();
    return res
      .status(200)
      .json({ message: "Transaction added to to customer account" });
  } catch (error) {
    console.error("Error creating banker:", error); // Log the error
    return res.status(500).json({ error: "An error occurred" });
  }
};

export default createTransaction;
