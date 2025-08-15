import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcrypt";

// 1. TypeScript interface for User
export interface IUser extends Document {
  _id: Types.ObjectId;            // ensure _id is typed
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

// 2. User schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 3. Hash password before save
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 4. Compare password method
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// 5. Export User model
export default mongoose.model<IUser>("User", UserSchema);

