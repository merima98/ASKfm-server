import express from "express";

import dislikesController from "./dislikesController.js";
import middlewares from "../../middlewares/requireAuthentication.js";

const router = express.Router();

router.post("/dislike", middlewares, dislikesController.dislikeQuestion); 

export default router;
