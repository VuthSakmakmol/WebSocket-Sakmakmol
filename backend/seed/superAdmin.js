import User from "../models/User.js";
import bcrypt from "bcryptjs";

const seedSuperAdmin = async () => {
    try {
        const existingSuperAdmin = await User.findOne({ role: "superadmin" });
        if (!existingSuperAdmin) {
            const hashedPassword = await bcrypt.hash("SuperAdmin123!", 10);
            await User.create({
                name: "Super Admin",
                email: "superadmin@example.com",
                password: hashedPassword,
                role: "superadmin",
                permissions: ["all"],
            });
            console.log("✅ Super Admin seeded successfully!");
        }
    } catch (error) {
        console.error("Error seeding Super Admin:", error);
    }
};

export default seedSuperAdmin;