import prisma from "../config/prisma.js";

/* ---------------- CREATE TASK ---------------- */
export const createTask = async (req, res) => {
  const { title } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId: req.user.id
      }
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- GET USER TASKS ---------------- */
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- UPDATE TASK ---------------- */
export const updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.update({
      where: { id },
      data: req.body
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- DELETE TASK ---------------- */
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id }
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};