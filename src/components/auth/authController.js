import userDAL from "../users/userDAL.js";
import utils from "../../utils/index.js";

async function signup(req, res) {
  try {
    const existingUser = await userDAL.findOne({
      where: { email: req.body.email },
    });

    if (existingUser !== null) {
      return res.status(400).send({ exception: "EmailAllreadyInUseException" });
    }

    const hash = await utils.password.hash(req.body.password);

    const username = req.body.email.split("@")[0];

    const user = await userDAL.create({
      data: { ...req.body, password: hash, username: username },
    });

    const payload = { id: user.id };

    const token = utils.jwt.sign(payload);
    const response = {
      user: {
        email: user.email,
        username: user.username,
      },
      token,
    };

    res.status(201).send(response);
  } catch (err) {}
}

async function signin(req, res) {
  let user = await userDAL.findOne({
    where: { username: req.body.username },
  });

  if (user === null) {
    user = await userDAL.findOne({
      where: { email: req.body.username },
    });
  }
  if (user === null) {
    return res.status(400).send({ exception: "UserNotFound" });
  }
  const verified = await utils.password.verify(
    user.password,
    req.body.password
  );
  if (verified) {
    const payload = { id: user.id };
    const token = utils.jwt.sign(payload);
    const response = {
      user: {
        email: user.email,
        username: user.username,
      },
      token,
    };
    return res.status(200).send(response);
  }
  return res.status(401).send({ exception: "NotAuthotizedException" });
}

export default { signup, signin };
