const mongoose = require('mongoose');
const Quiz = require('../../../models/quizModels');

const deleteQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quizId.'
      });
    }

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid questionId.'
      });
    }

    // Find quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    // Find question index
    const questionIndex = quiz.questions.findIndex(
      (q) => q._id.toString() === questionId
    );

    if (questionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Question not found in this quiz.'
      });
    }

    // Remove question
    quiz.questions.splice(questionIndex, 1);
    quiz.updatedAt = new Date();

    const updatedQuiz = await quiz.save();

    return res.status(200).json({
      success: true,
      message: 'Question deleted successfully.',
      data: updatedQuiz.questions
    });
  } catch (err) {
    console.error('Error deleting question:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting question.',
      error: err.message
    });
  }
};

module.exports = deleteQuestion;
