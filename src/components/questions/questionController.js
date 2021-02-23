import questionDAL from "./questionDAL.js";

async function createQuestion(req, res) {
  try {
    const values = req.body;
    const question = await questionDAL.create({
      data: {
        content: values.content,
        userId: values.userId,
      },
    });
    return res.status(200).send(question);
  } catch (err) {}
}

export default { createQuestion };
