import express from "express";

import likesController from "./likesController.js";
import middlewares from "../../middlewares/requireAuthentication.js";

const router = express.Router();

router.post("/like", middlewares, likesController.likeQuestion); 

export default router;
