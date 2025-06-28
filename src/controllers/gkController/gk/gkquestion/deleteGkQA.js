const GkSubject = require('../../../../models/gkModels');

const deleteQuestionAnswer = async (req, res) => {
  try {
    const { subjectId, headingId, qaId } = req.params;

    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    const heading = subject.headings.id(headingId);
    if (!heading) {
      return res.status(404).json({
        status: false,
        message: "Heading not found",
      });
    }

    const qa = heading.qaPairs.id(qaId);
    if (!qa) {
      return res.status(404).json({
        status: false,
        message: "Q&A not found",
      });
    }

    // Remove the Q&A
    heading.qaPairs.pull(qaId);
    subject.updatedAt = new Date();

    await subject.save();

    return res.status(200).json({
      status: true,
      message: "Q&A deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = deleteQuestionAnswer;
