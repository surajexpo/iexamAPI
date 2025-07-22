const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const getAllQuestionAnswers = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(subjectId) ||
        !mongoose.Types.ObjectId.isValid(headingId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId or headingId.',
      });
    }

    // Find subject
    const subject = await GkSubject.findById(subjectId).select('name headings');
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

    // Success response
    return res.status(200).json({
      success: true,
      message: "Q&A pairs fetched successfully.",
      subjectName: subject.name,
      headingTitle: heading.title,
      data: heading.qaPairs
    });

  } catch (error) {
    console.error('Error fetching Q&A pairs:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching Q&A pairs.',
      error: error.message
    });
  }
};

module.exports =  getAllQuestionAnswers ;
