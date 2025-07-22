const mongoose = require('mongoose');
const Quiz = require('../../../models/quizModels');

const updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const {
      title,
      description,
      category,
      timeLimit,
      isActive,
      questions
    } = req.body;

    // Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quizId.'
      });
    }

    // Build update object dynamically
    const updateFields = {};
    if (title !== undefined) updateFields.title = title.trim();
    if (description !== undefined) updateFields.description = description.trim();
    if (category !== undefined) updateFields.category = category.trim();
    if (timeLimit !== undefined) updateFields.timeLimit = timeLimit;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (questions !== undefined && Array.isArray(questions)) {
      updateFields.questions = questions;
    }
    updateFields.updatedAt = new Date();

    // Update quiz
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-__v'); // exclude __v from response

    if (!updatedQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Quiz updated successfully.',
      data: updatedQuiz
    });
  } catch (err) {
    console.error('Error updating quiz:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating quiz.',
      error: err.message
    });
  }
};

module.exports =  updateQuiz ;
