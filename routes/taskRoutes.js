import express from "express";
import { prisma } from "../config/prisma.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// =======================
// CREATE TASK (PROTECTED)
// =======================
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        userId: req.user.id,
      },
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// GET USER TASKS (PROTECTED)
// =======================
router.get("/", verifyToken, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// UPDATE TASK (PROTECTED)
// =======================
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title } = req.body;

    const task = await prisma.task.update({
      where: {
        id: req.params.id, // ✅ safe for UUID OR string IDs
      },
      data: {
        title,
      },
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =======================
// DELETE TASK (PROTECTED)
// =======================
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await prisma.task.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;