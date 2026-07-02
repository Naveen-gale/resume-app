import express from "express";
import {
  getAllCoverLetters,
  generateCoverLetter,
  saveCoverLetter,
  deleteCoverLetter,
  downloadCoverLetterPDF,
} from "../controllers/coverLetter.controller.js";

const router = express.Router();

router.get("/", getAllCoverLetters);
router.post("/generate", generateCoverLetter);
router.post("/", saveCoverLetter);
router.delete("/:id", deleteCoverLetter);
router.get("/:id/pdf", downloadCoverLetterPDF);

export default router;
