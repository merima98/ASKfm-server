import answerDAL from "./answerDAL.js";

async function createAnswer(req, res) {
  try {
    const values = req.body;
    const answer = await answerDAL.create({
      data: {
        content: values.content,
        questionId: values.questionId,
      },
    });
    return res.status(200).send(answer);
  } catch (err) {}
}

export default { createAnswer };
