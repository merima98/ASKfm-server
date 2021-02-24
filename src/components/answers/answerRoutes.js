import express from "express";

import answerController from "./answerController.js";

const router = express.Router();

router.post("/answerAdd", answerController.createAnswer);

export default router;
