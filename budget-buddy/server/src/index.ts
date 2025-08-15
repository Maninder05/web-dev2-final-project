import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., http://localhost:5173
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budget", budgetRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
