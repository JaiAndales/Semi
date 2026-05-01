import express from "express";

const router = express.Router();

// test route first (we will add real logic later)
router.get("/", (req, res) => {
  res.send("Auth route working");
});

export default router;