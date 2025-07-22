const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const updateQuestionAnswer = async (req, res) => {
  try {
    const { subjectId, headingId, qaId } = req.params;
    const { question, answer } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(subjectId) ||
        !mongoose.Types.ObjectId.isValid(headingId) ||
        !mongoose.Types.ObjectId.isValid(qaId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId, headingId, or qaId.',
      });
    }

    // Ensure at least one field is provided
    if (!question && !answer) {
      return res.status(400).json({
        success: false,
        message: "At least one of question or answer must be provided.",
      });
    }

    // Find subject
    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    // Find heading
    const heading = subject.headings.id(headingId);
    if (!heading) {
      return res.status(404).json({
        success: false,
        message: "Heading not found.",
      });
    }

    // Find Q&A
    const qa = heading.qaPairs.id(qaId);
    if (!qa) {
      return res.status(404).json({
        success: false,
        message: "Question & Answer not found.",
      });
    }

    // Update fields
    if (question) qa.question = question.trim();
    if (answer) qa.answer = answer.trim();
    qa.lastUpdated = new Date();
    subject.updatedAt = new Date();

    await subject.save();

    return res.status(200).json({
      success: true,
      message: "Q&A updated successfully.",
      data: qa
    });

  } catch (error) {
    console.error('Error updating Q&A:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating Q&A.',
      error: error.message
    });
  }
};

module.exports =  updateQuestionAnswer ;
