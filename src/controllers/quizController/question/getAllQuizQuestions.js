const mongoose = require('mongoose');
const Quiz = require('../../../models/quizModels');

const getAllQuizQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quizId.'
      });
    }

    // Find quiz and select only questions
    const quiz = await Quiz.findById(quizId).select('title category questions');
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Questions fetched successfully.',
      data: {
        quizTitle: quiz.title,
        category: quiz.category,
        totalQuestions: quiz.questions.length,
        questions: quiz.questions
      }
    });
  } catch (err) {
    console.error('Error fetching quiz questions:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching quiz questions.',
      error: err.message
    });
  }
};

module.exports =  getAllQuizQuestions;
