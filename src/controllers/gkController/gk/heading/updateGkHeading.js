const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const updateGkHeading = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;
    const { title, description } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(subjectId) || !mongoose.Types.ObjectId.isValid(headingId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId or headingId.',
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

    // Check for duplicate title if title is being updated
    if (title && title.trim().toLowerCase() !== heading.title.trim().toLowerCase()) {
      const duplicate = subject.headings.find(
        h => h.title.trim().toLowerCase() === title.trim().toLowerCase() && h._id.toString() !== headingId
      );
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Another heading with this title already exists in the subject.",
        });
      }
    }

    // Update fields
    if (title !== undefined) heading.title = title.trim();
    if (description !== undefined) heading.description = description.trim();
    heading.updatedAt = new Date();
    subject.updatedAt = new Date();
    await subject.save();

    res.status(200).json({
      success: true,
      message: "Heading updated successfully.",
      data: heading
    });

  } catch (error) {
    console.error('Error updating heading:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating heading.',
      error: error.message
    });
  }
};

module.exports =  updateGkHeading ;
