import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function create(values) {
  const question = await prisma.questions.create(values);
  return question;
}
async function findAll(values) {
  const questions = await prisma.questions.findMany(values);
  return questions;
}
export default { create, findAll };
