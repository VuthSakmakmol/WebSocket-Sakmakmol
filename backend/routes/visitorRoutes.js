import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { checkPermission } from "../middleware/checkPermission.js";
import { createVisitor, getVisitorHistory, updateVisitorStatus, deleteVisitor } from "../controllers/visitorController.js"; // ✅ Import deleteVisitor

const router = express.Router();

router.post("/create", protect, checkPermission("visitor:create"), createVisitor);
router.put("/update/:id", protect, checkPermission("visitor:update"), updateVisitorStatus);
router.get("/history", protect, checkPermission("visitor:read"), getVisitorHistory);
router.delete("/:id", protect, checkPermission("visitor:delete"), deleteVisitor); // ✅ Now deleteVisitor is defined

export default router;
