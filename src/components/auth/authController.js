import userDAL from "../users/userDAL.js";

async function signup(req, res) {
  try {
    const user = await userDAL.create({
      data: req.body,
    });
    res.status(201).send(user);
  } catch (err) {}
}

export default { signup };
