import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function findAll(values) {
  const questions = await prisma.questions.findMany(values);
  return questions;
}
async function deleteMany(values) {
  const dislikes = await prisma.dislikes.deleteMany(values);
  return dislikes;
}
async function likeQuestion(values) {
  const dislikedQuestion = await prisma.dislikes.create(values);
  return dislikedQuestion;
}

async function getLike(values) {
  const dislikedQuestion = await prisma.dislikes.findFirst(values);
  return dislikedQuestion;
}
async function deleteLike(options) {
  const dislikedQuestion = await prisma.dislikes.delete(options);
  return dislikedQuestion;
}
export default {
  findAll,
  likeQuestion,
  getLike,
  deleteLike,
  deleteMany,
};
