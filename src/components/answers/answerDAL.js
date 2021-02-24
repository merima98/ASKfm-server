import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function create(values) {
  const answer = await prisma.answer.create(values);
  return answer;
}

export default { create };
