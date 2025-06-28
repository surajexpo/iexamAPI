const GkSubject = require('../../../../models/gkModels');
const updateGkHeading = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;
    const { title, description } = req.body;

    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    // Find the heading
    const heading = subject.headings.id(headingId);
    if (!heading) {
      return res.status(404).json({
        status: false,
        message: "Heading not found",
      });
    }

    // Check for duplicate title if title is being changed
    if (title && title.toLowerCase().trim() !== heading.title.toLowerCase().trim()) {
      const duplicate = subject.headings.find(
        h => h.title.toLowerCase().trim() === title.toLowerCase().trim() && h._id.toString() !== headingId
      );

      if (duplicate) {
        return res.status(409).json({
          status: false,
          message: "Another heading with this title already exists in the subject",
        });
      }
    }

    // Update heading fields
    if (title !== undefined) heading.title = title;
    if (description !== undefined) heading.description = description;
    heading.createdAt = heading.createdAt || new Date(); // Preserve original creation if missing
    subject.updatedAt = new Date();
    await subject.save();
    return res.status(200).json({
      status: true,
      data: heading,
      message: "Heading updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = updateGkHeading;
