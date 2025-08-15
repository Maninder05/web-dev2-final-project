import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  user: mongoose.Types.ObjectId;
  monthlyLimit: number;
}

const BudgetSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  monthlyLimit: { type: Number, required: true },
});

export default mongoose.model<IBudget>("Budget", BudgetSchema);
