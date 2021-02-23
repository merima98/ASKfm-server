import express from "express";

import questionController from "./questionController.js";

const router = express.Router();

router.post("/questionAdd", questionController.createQuestion);

export default router;
