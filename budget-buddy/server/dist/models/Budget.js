import mongoose, { Schema } from "mongoose";
const BudgetSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    monthlyLimit: { type: Number, required: true },
});
export default mongoose.model("Budget", BudgetSchema);
