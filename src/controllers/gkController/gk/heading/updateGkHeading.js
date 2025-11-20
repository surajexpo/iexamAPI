const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const updateGkHeading = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;
    const { title, description, createdBy } = req.body;

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(subjectId) || !mongoose.Types.ObjectId.isValid(headingId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId or headingId.',
      });
    }

    // Fetch parent subject
    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found.',
      });
    }

    // Locate nested heading
    const heading = subject.headings.id(headingId);
    if (!heading) {
      return res.status(404).json({
        success: false,
        message: 'Heading not found.',
      });
    }

    // Check duplicate title inside same subject
    if (title && title.trim().toLowerCase() !== heading.title.trim().toLowerCase()) {
      const duplicate = subject.headings.find(h =>
        h.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        h._id.toString() !== headingId
      );
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: 'Another heading with this title already exists in this subject.',
        });
      }
    }

    // Safely update fields
    if (title !== undefined) heading.title = String(title).trim();
    if (description !== undefined) heading.description = String(description).trim();

    heading.updatedAt = new Date();
    if (createdBy) {
      heading.updatedBy = createdBy;
    }

    subject.updatedAt = new Date();
    await subject.save();

    res.status(200).json({
      success: true,
      message: 'Heading updated successfully.',
      data: heading
    });

  } catch (error) {
    console.error('Error updating heading:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating heading.',
      error: error.message,
    });
  }
};

module.exports = updateGkHeading;
