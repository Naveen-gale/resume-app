import express from "express";
import {
  getAllResumes,
  generateResume,
  saveResume,
  deleteResume,
  downloadResumePDF,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.get("/", getAllResumes);
router.post("/generate", generateResume);
router.post("/", saveResume);
router.delete("/:id", deleteResume);
router.get("/:id/pdf", downloadResumePDF);

export default router;
