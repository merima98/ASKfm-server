import usersDAL from "../users/userDAL.js";

async function getUserById(req, res) {
  try {
    const userId = res.locals.userId;
    const user = await usersDAL.findOne({
      where: {
        id: userId,
      },
    });
    if (user === null) {
      return res.status(400).send({ exception: "UserNotFound" });
    }

    const response = {
      email: user.email,
      username: user.username,
      image: user.image,
    };
    return res.status(200).send(response);
  } catch (err) {}
}
export default {
  getUserById,
};
