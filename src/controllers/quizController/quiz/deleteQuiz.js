const mongoose = require('mongoose');
const Quiz = require('../../../models/quizModels');

const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quizId.'
      });
    }

    // Delete the quiz
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (!deletedQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully.',
      data: deletedQuiz
    });
  } catch (err) {
    console.error('Error deleting quiz:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting quiz.',
      error: err.message
    });
  }
};

module.exports =  deleteQuiz ;
