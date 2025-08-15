import Transaction from "../models/Transaction.js";
export const addTransaction = async (req, res) => {
    const { type, category, amount } = req.body;
    try {
        const transaction = await Transaction.create({ user: req.user.id, type, category, amount });
        res.status(201).json(transaction);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.id });
        res.status(200).json(transactions);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
