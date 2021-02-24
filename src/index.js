import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./components/auth/authRoutes.js";
import questionRoutes from "./components/questions/questionRoutes.js";
import answerRoutes from "./components/answers/answerRoutes.js";
import likesRoutes from "./components/likes/likesRoutes.js";
import dislikesRoutes from "./components/dislikes/dislikesRoutes.js";

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());
app.use(authRoutes);
app.use(questionRoutes);
app.use(answerRoutes);
app.use(likesRoutes);
app.use(dislikesRoutes);

app.listen(PORT);
