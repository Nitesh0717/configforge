import { Router, Request, Response } from "express";
import { appConfig } from "../config/appConfig";
import { validateData } from "../utils/validator";

const router = Router();

// 🔐 Auth Middleware
const authMiddleware = (req: any, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = { token };
  next();
};

// 🧠 In-memory DB
let db: any[] = [];

/**
 * ✅ CREATE
 */
router.post("/:model", authMiddleware, (req: Request, res: Response) => {
  try {
    const model = req.params.model as string;
    const data = req.body;

    const modelSchema = appConfig.models[model];

    if (!modelSchema) {
      return res.status(400).json({ error: "Model not allowed" });
    }

    const validation = validateData(modelSchema, data);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const record = {
      id: Date.now(),
      model,
      data,
      createdAt: new Date(),
    };

    db.push(record);

    res.json({ success: true, record });
  } catch {
    res.status(500).json({ error: "Create failed" });
  }
});

/**
 * ✅ READ
 */
router.get("/:model", authMiddleware, (req: Request, res: Response) => {
  try {
    const model = req.params.model as string;

    const modelSchema = appConfig.models[model];

    if (!modelSchema) {
      return res.status(400).json({ error: "Model not allowed" });
    }

    const result = db.filter((item) => item.model === model);

    res.json(result);
  } catch {
    res.status(500).json({ error: "Fetch failed" });
  }
});

/**
 * ✅ UPDATE
 */
router.put("/:model/:id", authMiddleware, (req: Request, res: Response) => {
  try {
    const model = req.params.model as string;
    const id = Number(req.params.id);
    const data = req.body;

    const index = db.findIndex(
      (item) => item.id === id && item.model === model
    );

    if (index === -1) {
      return res.status(404).json({ error: "Record not found" });
    }

    const modelSchema = appConfig.models[model];

    const validation = validateData(modelSchema, data);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    db[index].data = data;

    res.json({ success: true, updated: db[index] });
  } catch {
    res.status(500).json({ error: "Update failed" });
  }
});

/**
 * ✅ DELETE
 */
router.delete("/:model/:id", authMiddleware, (req: Request, res: Response) => {
  try {
    const model = req.params.model as string;
    const id = Number(req.params.id);

    const modelSchema = appConfig.models[model];

    if (!modelSchema) {
      return res.status(400).json({ error: "Model not allowed" });
    }

    db = db.filter((item) => item.id !== id);

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
});

export default router;
