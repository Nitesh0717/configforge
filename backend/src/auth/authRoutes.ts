import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// 🔥 In-memory user store (for now)
let users: any[] = [];

const SECRET = "secret123";

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // ❌ Missing fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    // ❌ Duplicate user
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now(),
      email,
      password: hashedPassword
    };

    users.push(user);

    res.json({ success: true, message: "User registered successfully" });

  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Register failed" });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // ❌ Missing fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = users.find((u) => u.email === email);

    // ❌ User not found
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // 🔐 Check password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // 🔑 Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
