import express from "express";

const router = express.Router();

// test route
router.get("/", (req, res) => {
  res.send("Auth route working");
});

// SIGNUP route (THIS FIXES YOUR ERROR)
router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  res.json({
    message: "Signup successful",
    user: {
      email,
    },
  });
});

export default router;