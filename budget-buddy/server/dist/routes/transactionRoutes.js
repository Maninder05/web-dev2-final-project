import { Router } from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
export default router;
