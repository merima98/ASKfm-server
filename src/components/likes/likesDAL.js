import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function findAll(values) {
  const questions = await prisma.questions.findMany(values);
  return questions;
}
async function deleteMany(values) {
  const likes = await prisma.likes.deleteMany(values);
  return likes;
}
async function likeQuestion(values) {
  const likedQuestion = await prisma.likes.create(values);
  return likedQuestion;
}

async function getLike(values) {
  const likedQuestion = await prisma.likes.findFirst(values);
  return likedQuestion;
}
async function deleteLike(options) {
  const likedQuestion = await prisma.likes.delete(options);
  return likedQuestion;
}
export default {
  findAll,
  likeQuestion,
  getLike,
  deleteLike,
  deleteMany,
};
