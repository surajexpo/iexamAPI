const addQuiz = require("./quiz/addQuiz");
const getAllQuizzes = require("./quiz/getAllQuizzes");
const updateQuiz = require("./quiz/updateQuiz");
const deleteQuiz = require("./quiz/deleteQuiz");
const addQuestionToQuiz = require("./question/addQuestion");
const updateQuizQuestion = require("./question/updateQuizQuestion");
const getAllQuizQuestions = require("./question/getAllQuizQuestions");
const deleteQuestion= require("./question/deleteQuestion");
const getQuizById = require("./quiz/getQuizById");

module.exports = {
 addQuiz,
 getAllQuizzes,
 updateQuiz,
 deleteQuiz,
 addQuestionToQuiz,
 updateQuizQuestion,
 getAllQuizQuestions,
 deleteQuestion,
 getQuizById
};
