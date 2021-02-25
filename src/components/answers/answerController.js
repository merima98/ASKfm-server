import answerDAL from "./answerDAL.js";

async function createAnswer(req, res) {
  try {
    const values = req.body;
    const userId = res.locals.userId;
    const answer = await answerDAL.create({
      data: {
        content: values.content,
        questionId: values.questionId,
        userId: userId,
      },
    });
    return res.status(200).send(answer);
  } catch (err) {}
}

async function getAnswers(req, res) {
  const questionId = req.query.questionId;
  const answers = await answerDAL.findAll({
    orderBy: {
      createdAt: "desc",
    },
    where: { questionId: parseInt(questionId) },
  });

  if (answers === null) {
    return res.status(400).send({ exception: "AnswersNotFound" });
  }
  return res.status(200).send(answers);
}

export default { createAnswer, getAnswers };
