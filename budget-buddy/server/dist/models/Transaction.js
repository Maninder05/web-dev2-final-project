import mongoose, { Schema } from "mongoose";
const TransactionSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});
export default mongoose.model("Transaction", TransactionSchema);
