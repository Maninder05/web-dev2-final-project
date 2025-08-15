import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
// 2. User schema
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// 3. Hash password before save
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// 4. Compare password method
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
// 5. Export User model
export default mongoose.model("User", UserSchema);
