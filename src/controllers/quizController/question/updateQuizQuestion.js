const mongoose = require('mongoose');
const Quiz = require('../../../models/quizModels');

const updateQuizQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { questionText, options, explanation, marks } = req.body;

    // Validate IDs
    console.log('quiz id',quizId,' question id',questionId);
    console.log('question data',questionText,options,explanation,marks);
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ success: false, message: 'Invalid quizId.' });
    }
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ success: false, message: 'Invalid questionId.' });
    }

    // Find quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found.' });
    }

    // Find question
    const question = quiz.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found in quiz.' });
    }

    // Update question fields
    if (questionText !== undefined) question.questionText = questionText.trim();
    if (Array.isArray(options)) {
      // Clear existing options array (in place)
      question.options.splice(0, question.options.length);
      // Push new options one by one (so Mongoose tracks change)
      options.forEach(opt => question.options.push(opt));
    }
    if (explanation !== undefined) question.explanation = explanation.trim();
    if (marks !== undefined) question.marks = marks;

    question.updatedAt = new Date();
    quiz.updatedAt = new Date();

    // Mark as modified (important for nested arrays)
    quiz.markModified('questions');

    // Save updated quiz
    const savedQuiz = await quiz.save();

    // Get updated question from saved quiz
    const updatedQuestion = savedQuiz.questions.id(questionId);

    return res.status(200).json({
      success: true,
      message: 'Question updated successfully.',
      data: updatedQuestion
    });
  } catch (err) {
    console.error('Error updating quiz question:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating quiz question.',
      error: err.message
    });
  }
};

module.exports = updateQuizQuestion;
