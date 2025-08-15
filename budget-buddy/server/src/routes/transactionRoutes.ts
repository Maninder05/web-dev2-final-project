import { Router } from "express";
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.put("/:id", protect, updateTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;
