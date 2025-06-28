const GkSubject = require('../../../../models/gkModels');

const getAllQuestionAnswers = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;

    const subject = await GkSubject.findById(subjectId).select('name headings');
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

    return res.status(200).json({
      status: true,
      subjectName: subject.name,
      headingTitle: heading.title,
      data: heading.qaPairs,
      message: "Q&A pairs fetched successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = getAllQuestionAnswers;
