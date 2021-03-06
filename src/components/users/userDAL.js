import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function create(values) {
  const user = await prisma.user.create(values);
  return user;
}
async function findOne(options) {
  const user = await prisma.user.findFirst(options);
  return user;
}
async function updateUser(options) {
  const user = await prisma.user.update(options);
  return user;
}

export default { create, findOne, updateUser };
