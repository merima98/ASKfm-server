import userDAL from "../users/userDAL.js";
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

async function patchMySelf(req, res) {
  try {
    const userId = res.locals.userId;
    const values = req.body;

    const existingUsername = await userDAL.findOne({
      where: { username: req.body.username },
    });
    if (existingUsername !== null && existingUsername.id !== userId) {
      return res
        .status(400)
        .send({ exception: "UsernameAllreadyInUseException" });
    }

    const args = {
      select: {
        email: true,
        username: true,
        image: true,
      },
      where: {
        id: userId,
      },
      data: { ...values },
    };

    const user = await usersDAL.updateUser(args);
    return res.status(200).send(user);
  } catch (error) {}
}
export default {
  getUserById,
  patchMySelf,
};
