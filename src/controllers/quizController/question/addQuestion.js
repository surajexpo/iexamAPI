const mongoose = require('mongoose');
const Quiz = require('../../../models/quizModels');

const addQuestionToQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const newQuestion = req.body; // Expect a single question in body

    // Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quizId.'
      });
    }

    // Validate newQuestion
    if (
      !newQuestion.questionText ||
      !Array.isArray(newQuestion.options) ||
      newQuestion.options.length < 2 ||
      typeof newQuestion.marks !== 'number'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid question format. Must have questionText, at least 2 options, and marks.'
      });
    }

    for (const option of newQuestion.options) {
      if (
        !option.text ||
        typeof option.text !== 'string' ||
        typeof option.isCorrect !== 'boolean'
      ) {
        return res.status(400).json({
          success: false,
          message: 'Each option must have text (string) and isCorrect (boolean).'
        });
      }
    }

    // Find quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    // Add question
    const addedQuestion = quiz.questions.push(newQuestion);
    quiz.updatedAt = new Date();

    await quiz.save();
    const savedQuestion = quiz.questions[quiz.questions.length - 1];

    return res.status(200).json({
      success: true,
      message: 'Question added successfully.',
      data: savedQuestion
    });
  } catch (err) {
    console.error('Error adding question:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while adding question.',
      error: err.message
    });
  }
};

module.exports = addQuestionToQuiz;
