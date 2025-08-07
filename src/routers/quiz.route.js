const quizRoute=require('express').Router();
const {addQuiz,getAllQuizzes,updateQuiz,deleteQuiz,addQuestionToQuiz,updateQuizQuestion,getAllQuizQuestions,deleteQuestion,getQuizById}=require('../controllers/quizController');
// quiz routes
quizRoute.post('/addQuiz', addQuiz);
quizRoute.get('/getQuizById/:quizId', getQuizById);
quizRoute.get('/getAllQuizzes', getAllQuizzes);
quizRoute.put('/updateQuiz/:quizId', updateQuiz);
quizRoute.delete('/deleteQuiz/:quizId', deleteQuiz);
// question routes
quizRoute.post('/:quizId/add-questions', addQuestionToQuiz);
quizRoute.put('/:quizId/question/:questionId', updateQuizQuestion);
quizRoute.get('/:quizId/getAllQuestions',getAllQuizQuestions);
quizRoute.delete('/:quizId/question/:questionId', deleteQuestion);
// get quiz by id


module.exports = quizRoute;