import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    meetWho: { type: String, required: true },
    purpose: { type: String, required: true },
    checkInTime: { type: Date, default: Date.now },
    checkOutTime: { type: Date, default: null },
    status: { type: String, enum: ["pending", "approved", "declined", "checked out"], default: "pending" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Visitor", VisitorSchema);