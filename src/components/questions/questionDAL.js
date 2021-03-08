import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function create(values) {
  const question = await prisma.questions.create(values);
  return question;
}
async function findOne(values) {
  const question = await prisma.questions.findFirst(values);
  return question;
}
async function findAll(values) {
  const questions = await prisma.questions.findMany(values);
  return questions;
}

async function patchQuestion(values) {
  const question = await prisma.questions.update(values);
  return question;
}

export default { create, findOne, findAll, patchQuestion };
