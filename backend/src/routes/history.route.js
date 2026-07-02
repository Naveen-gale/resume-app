import express from "express";
import { getHistoryByProfileId } from "../controllers/history.controller.js";

const router = express.Router();

router.get("/:profileId", getHistoryByProfileId);

export default router;
