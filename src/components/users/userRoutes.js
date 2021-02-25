import express from "express";

import userController from "./userController.js";
import middlewares from "../../middlewares/requireAuthentication.js";

const router = express.Router();

router.get("/userById", middlewares, userController.getUserById);

export default router;
