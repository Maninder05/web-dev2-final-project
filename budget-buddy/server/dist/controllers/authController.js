import User from "../models/User.js";
import jwt from "jsonwebtoken";
// Safe JWT secret
const getJwtSecret = () => {
    if (!process.env.JWT_SECRET)
        throw new Error("JWT_SECRET is not defined");
    return process.env.JWT_SECRET;
};
// Generate JWT token
const generateToken = (id) => jwt.sign({ id }, getJwtSecret(), { expiresIn: "7d" });
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email already exists" });
        const user = await User.create({ name, email, password });
        // _id is typed as ObjectId, convert to string
        const userId = user._id.toString();
        res.status(201).json({
            user: { id: userId, name: user.name, email: user.email },
            token: generateToken(userId),
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        const userId = user._id.toString();
        res.status(200).json({
            user: { id: userId, name: user.name, email: user.email },
            token: generateToken(userId),
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};
