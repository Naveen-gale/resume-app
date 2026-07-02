import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profile.route.js";
import resumeRoutes from "./routes/resume.route.js";
import coverLetterRoutes from "./routes/coverLetter.route.js";
import historyRoutes from "./routes/history.route.js";

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/coverLetter", coverLetterRoutes);
app.use("/api/v1/history", historyRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;