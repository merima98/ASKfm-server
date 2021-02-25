import express from "express";

import answerController from "./answerController.js";
import middlewares from "../../middlewares/requireAuthentication.js";

const router = express.Router();

router.post("/answerAdd", middlewares, answerController.createAnswer);
router.get("/answerGet", answerController.getAnswers);

export default router;
