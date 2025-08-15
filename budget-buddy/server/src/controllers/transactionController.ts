import type { Request, Response } from "express";
import Transaction from "../models/Transaction.js";

export const addTransaction = async (req: any, res: Response) => {
  const { type, category, amount } = req.body;
  try {
    const transaction = await Transaction.create({ user: req.user.id, type, category, amount });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getTransactions = async (req: any, res: Response) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Update transaction (we can allow updating amount and category)
export const updateTransaction = async (req: any, res: Response) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user.id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found for this user" });

    const { amount, category } = req.body;
    if (amount !== undefined) transaction.amount = amount;
    if (category !== undefined) transaction.category = category;

    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


export const deleteTransaction = async (req: any, res: Response) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id, user: req.user.id });
    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};




