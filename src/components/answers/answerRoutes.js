import express from "express";

import answerController from "./answerController.js";

const router = express.Router();

router.post("/answerAdd", answerController.createAnswer);
router.get("/answerGet", answerController.getAnswers);

export default router;
