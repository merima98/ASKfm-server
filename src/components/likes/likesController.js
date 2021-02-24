import likesDAL from "./likesDAL.js";
import dislikesDAL from "../dislikes/dislikesDAL.js";

async function likeQuestion(req, res) {
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
    const like = await likesDAL.getLike({
      where: { questionId: parseInt(questionId), userId: parseInt(userId) },
    });

    const dislike = await dislikesDAL.getLike({
      where: { questionId: parseInt(questionId), userId: parseInt(userId) },
    });

    if (!like && !dislike) {
      const liked = await likesDAL.likeQuestion(args);
      res.status(200).send({ questionId, like: liked });
    }
    if (!like && dislike) {
      const deleted = await dislikesDAL.deleteLike({
        where: {
          id: dislike.id,
        },
      });
      const disliked = await likesDAL.likeQuestion(args);
      res.status(200).send({ questionId, dislikes: deleted, like: disliked });
    }
    if (like) {
      await likesDAL.deleteLike({
        where: {
          id: like.id,
        },
      });
      res.status(200).send({ questionId });
    }
  } catch (err) {}
}

export default {
  likeQuestion,
};
