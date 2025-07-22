const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const deleteGkHeading = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(subjectId) || !mongoose.Types.ObjectId.isValid(headingId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId or headingId.',
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

    // Remove heading from array
    subject.headings.pull(headingId);
    subject.updatedAt = new Date();
    await subject.save();

    res.status(200).json({
      success: true,
      message: "Heading deleted successfully.",
      data: heading
    });

  } catch (error) {
    console.error('Error deleting heading:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting heading.',
      error: error.message
    });
  }
};

module.exports =  deleteGkHeading ;
