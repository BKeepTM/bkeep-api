import express from "express";
import multer from "multer";
import analysisController from "../controller/analysisController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/analysis/frame", upload.single("image"), analysisController.frame);
router.post("/analysis/hive", upload.single("image"), analysisController.hive);

export default router;
 