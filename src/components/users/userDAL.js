import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function create(values) {
  const user = await prisma.user.create(values);
  return user;
}

export default { create };
