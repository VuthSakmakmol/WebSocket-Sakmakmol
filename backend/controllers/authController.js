import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role, permissions: user.permissions },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, role: user.role, permissions: user.permissions });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const createAdmin = async (req, res) => {
    try {
        const { name, email, password, permissions } = req.body;
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            permissions,
        });

        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};