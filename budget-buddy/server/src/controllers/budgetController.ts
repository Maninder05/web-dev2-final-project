import type { Request, Response } from "express";
import Budget from "../models/Budget.js";

export const setBudget = async (req: any, res: Response) => {
  const { monthlyLimit } = req.body;
  try {
    let budget = await Budget.findOne({ user: req.user.id });
    if (budget) {
      budget.monthlyLimit = monthlyLimit;
      await budget.save();
    } else {
      budget = await Budget.create({ user: req.user.id, monthlyLimit });
    }
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getBudget = async (req: any, res: Response) => {
  try {
    const budget = await Budget.findOne({ user: req.user.id });
    res.status(200).json(budget);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
