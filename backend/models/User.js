import mongoose from "mongoose"; // ✅ Add this import

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
    permissions: {
        type: [String], // Store permissions as an array (["visitor:create", "visitor:read", "visitor:update", "visitor:delete"])
        default: ["visitor:read"], // Default permission for admins is read-only
    },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
