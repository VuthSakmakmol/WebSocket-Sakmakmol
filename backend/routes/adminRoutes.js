import express from "express";
import { createAdmin, getAdmins, updateAdmin, deleteAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { updateAdminPermissions } from "../controllers/adminController.js";

const router = express.Router();

router.post("/create", protect, createAdmin);
router.get("/", protect, getAdmins);
router.put("/:id", protect, updateAdmin);
router.delete("/:id", protect, deleteAdmin);
router.put("/permissions/:id", protect, updateAdminPermissions);

export default router;