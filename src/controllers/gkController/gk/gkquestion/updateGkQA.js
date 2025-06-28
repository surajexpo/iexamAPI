const GkSubject = require('../../../../models/gkModels');

const updateQuestionAnswer = async (req, res) => {
  try {
    const { subjectId, headingId, qaId } = req.params;
    const { question, answer } = req.body;
    if (!question && !answer) {
      return res.status(400).json({
        status: false,
        message: "At least one of question or answer must be provided",
      });
    }
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
        message: "Question & Answer not found",
      });
    }

    // Update fields
    if (question) qa.question = question;
    if (answer) qa.answer = answer;
    qa.lastUpdated = new Date();

    subject.updatedAt = new Date();
    await subject.save();

    return res.status(200).json({
      status: true,
      data: qa,
      message: "Q&A updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = updateQuestionAnswer;
