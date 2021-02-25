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

export default { createQuestion, getQuestion };
