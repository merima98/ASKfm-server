import questionDAL from "./questionDAL.js";
import dotenv from "dotenv";

import stripe from "stripe";
import { v4 } from "uuid";

dotenv.config();

const { STRIPE_SECRET_KEY } = process.env;

const publishKey = new stripe(STRIPE_SECRET_KEY);

async function createQuestion(req, res) {
  try {
    const userId = res.locals.userId;
    const values = req.body;
    const question = await questionDAL.create({
      data: {
        content: values.content,
        userId: userId,
      },
    });
    return res.status(200).send(question);
  } catch (err) {}
}

async function getQuestion(req, res) {
  try {
    const questions = await questionDAL.findAll({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        totalHearts: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        likes: {
          include: {
            user: true,
            question: true,
          },
        },
        Dislikes: {
          include: {
            user: true,
            question: true,
          },
        },
        Answer: {
          include: {
            question: true,
          },
        },
      },
    });

    if (questions === null) {
      return res.status(400).send({ exception: "QuestionsNotFound" });
    }
    return res.status(200).send(questions);
  } catch (err) {}
}

async function getHotestQuestion(req, res) {
  try {
    const questions = await questionDAL.findAll({
      orderBy: {
        totalHearts: "desc",
      },
      select: {
        id: true,
        content: true,
        totalHearts: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        likes: {
          include: {
            user: true,
            question: true,
          },
        },
        Dislikes: {
          include: {
            user: true,
            question: true,
          },
        },
        Answer: {
          include: {
            question: true,
          },
        },
      },
    });

    if (questions === null) {
      return res.status(400).send({ exception: "QuestionsNotFound" });
    }
    return res.status(200).send(questions);
  } catch (err) {}
}

async function getUserQuestion(req, res) {
  try {
    const userId = res.locals.userId;
    const questions = await questionDAL.findAll({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        user: {
          select: {
            username: true,
            email: true,
          },
        },
        likes: {
          include: {
            user: true,
            question: true,
          },
        },
        Dislikes: {
          include: {
            user: true,
            question: true,
          },
        },
        Answer: {
          where: {
            userId: userId,
          },
          include: {
            question: true,
          },
        },
      },
    });

    if (questions === null) {
      return res.status(400).send({ exception: "QuestionsNotFound" });
    }
    return res.status(200).send(questions);
  } catch (err) {}
}
async function rateQuestion(req, res) {
  try {
    const questionId = parseInt(req.query.questionId);
    const question = await questionDAL.findOne({
      where: {
        id: questionId,
      },
      select: {
        id: true,
        content: true,
        totalHearts: true,
      },
    });
    if (question !== null) {
      question.totalHearts += 1;
      const args = {
        where: {
          id: questionId,
        },
        data: { ...question },
      };
      const updatedQuestion = await questionDAL.patchQuestion(args);
      return res.status(200).send(updatedQuestion);
    }
    return res.status(500).send({ exception: "QuestionNotFound" });
  } catch (err) {}
}

async function payment(req, res) {
  try {
    const { question, token } = req.body;
    const idempontencyKey = v4();

    const customer = await publishKey.customers.create({
      email: token.email,
      source: token.id,
    });

    const result = await publishKey.charges.create(
      {
        amount: question.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `purchase of ${question.name}`,
      },
      { idempontencyKey }
    );
    await res.status(200).json(result);
  } catch (err) {}
}
export default {
  createQuestion,
  getQuestion,
  getUserQuestion,
  rateQuestion,
  getHotestQuestion,
  payment,
};
