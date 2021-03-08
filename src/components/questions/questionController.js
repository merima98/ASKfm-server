import questionDAL from "./questionDAL.js";

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
    const questionId = 3;
    const question = await questionDAL.findOne({
      where: {
        id: questionId,
      },
    });
    if (question !== null) {
      question.totalHearts += 1;
      const args = {
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
export default { createQuestion, getQuestion, getUserQuestion, rateQuestion };
