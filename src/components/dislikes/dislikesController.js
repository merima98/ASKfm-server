import dislikesDAL from "./dislikesDAL.js";
import likesDAL from "../likes/likesDAL.js";

async function dislikeQuestion(req, res) {
  try {
    const userId = res.locals.userId;
    const questionId = req.query.questionId;
    const args = {
      data: {
        user: {
          connect: { id: parseInt(userId) },
        },
        question: {
          connect: { id: parseInt(questionId) },
        },
      },
    };
    const dislike = await dislikesDAL.getLike({
      where: { questionId: parseInt(questionId), userId: parseInt(userId) },
    });

    const like = await likesDAL.getLike({
      where: { questionId: parseInt(questionId), userId: parseInt(userId) },
    });

    if (!dislike && !like) {
      const disliked = await dislikesDAL.likeQuestion(args);
      res.status(200).send({ questionId, dislikes: disliked });
    }
    if (!dislike && like) {
      await likesDAL.deleteLike({
        where: {
          id: like.id,
        },
      });
      const disliked = await dislikesDAL.likeQuestion(args);
      res.status(200).send({ questionId, dislikes: disliked, like: like });
    }
    if (dislike) {
      await dislikesDAL.deleteLike({
        where: {
          id: dislike.id,
        },
      });
      res.status(200).send({ questionId });
    }
  } catch (err) {}
}

export default {
  dislikeQuestion,
};
