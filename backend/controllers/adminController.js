import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createAdmin = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied" });
        }

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

export const getAdmins = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const admins = await User.find({ role: "admin" }).select("-password");
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateAdmin = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const { permissions } = req.body;
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        admin.permissions = permissions;
        await admin.save();

        res.json({ message: "Admin updated successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const admin = await User.findByIdAndDelete(req.params.id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        res.json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateAdminPermissions = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ message: "Access denied" });
        }

        const { permissions } = req.body;
        const admin = await User.findById(req.params.id);
        if (!admin) return res.status(404).json({ message: "Admin not found" });

        admin.permissions = permissions;
        await admin.save();

        res.json({ message: "Admin permissions updated successfully", admin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
