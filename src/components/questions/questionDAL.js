import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function create(values) {
  const question = await prisma.questions.create(values);
  return question;
}

export default { create };
