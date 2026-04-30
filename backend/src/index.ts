import express, { Request, Response } from "express";
import cors from "cors";
import dynamicRoutes from "./routes/dynamicRoutes";
import authRoutes from "./auth/authRoutes";

const app = express();

// 🔧 CORS (IMPORTANT for frontend requests)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔧 Parse JSON body
app.use(express.json());

// 🔍 Health check route
app.get("/", (_req: Request, res: Response) => {
  res.send("Server running");
});

// 🔐 Auth routes
app.use("/auth", authRoutes);

// 🔥 Dynamic API routes
app.use("/api", dynamicRoutes);

// 🚀 Start server
const PORT = 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server started on http://0.0.0.0:${PORT}`);
});
