import express from "express";

import questionController from "./questionController.js";
import middlewares from "../../middlewares/requireAuthentication.js";

const router = express.Router();

router.post("/questionAdd", middlewares, questionController.createQuestion);
router.get("/questionGet", questionController.getQuestion);
router.get("/userQuestionGet", middlewares, questionController.getUserQuestion);

export default router;
