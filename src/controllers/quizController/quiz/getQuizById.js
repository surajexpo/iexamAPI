const mongoose = require('mongoose');
const Quiz = require('../../../models/quizModels');

const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quizId.'
      });
    }

    // Find quiz
    const quiz = await Quiz.findById(quizId).populate('createdBy', 'name email'); // optional: populate creator info

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Quiz fetched successfully.',
      data: quiz
    });

  } catch (err) {
    console.error('Error fetching quiz:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching quiz.',
      error: err.message
    });
  }
};

module.exports = getQuizById;
