const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const deleteQuestionAnswer = async (req, res) => {
  try {
    const { subjectId, headingId, qaId } = req.params;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(subjectId) ||
        !mongoose.Types.ObjectId.isValid(headingId) ||
        !mongoose.Types.ObjectId.isValid(qaId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId, headingId, or qaId.',
      });
    }

    // Find parent subject
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
        message: "Q&A not found.",
      });
    }

    // Remove the Q&A
    heading.qaPairs.pull(qaId);
    subject.updatedAt = new Date();
    await subject.save();

    return res.status(200).json({
      success: true,
      message: "Q&A deleted successfully.",
      data: qa
    });

  } catch (error) {
    console.error('Error deleting Q&A:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting Q&A.',
      error: error.message
    });
  }
};

module.exports =  deleteQuestionAnswer ;
