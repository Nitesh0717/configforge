import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // ✅ Accept ANY login (for demo)
  return res.json({
    token: "demo-token",
    user: { email }
  });
});

export default router;
