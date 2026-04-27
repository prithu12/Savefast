import express from "express";
import upload from "../middleware/uploadmiddleware.js";
import { deleteFile, downloadFile, getfiles, uploadFile } from "../controllers/fileController.js";

const router = express.Router();
router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getfiles);
router.get("/download/:id", downloadFile);
router.delete("/:id", deleteFile);

export default router;
