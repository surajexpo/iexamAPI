const GkSubject = require('../../../../models/gkModels');

const deleteGkHeading = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;

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

    // Remove heading from array
    subject.headings.pull(headingId);

    subject.updatedAt = new Date();
    await subject.save();

    return res.status(200).json({
      status: true,
      message: "Heading deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = deleteGkHeading;
