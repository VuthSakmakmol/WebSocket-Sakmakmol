import Visitor from "../models/Visitor.js";
import { Server } from "socket.io";

export const createVisitor = async (req, res) => {
    try {
        const { name, phone, meetWho, purpose } = req.body;
        const visitor = await Visitor.create({
            name,
            phone,
            meetWho,
            purpose,
            createdBy: req.user.id,
        });
        req.io.emit("newVisitor", visitor);
        res.status(201).json(visitor);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateVisitorStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) return res.status(404).json({ message: "Visitor not found" });

        visitor.status = status;
        visitor.approvedBy = req.user.id;
        if (status === "checked out") visitor.checkOutTime = new Date();
        await visitor.save();

        req.io.emit("visitorStatusUpdate", visitor);
        res.json(visitor);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getVisitorHistory = async (req, res) => {
    try {
        const visitors = await Visitor.find().populate("approvedBy", "name").populate("createdBy", "name");
        res.json(visitors);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndDelete(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }
        res.json({ message: "Visitor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
