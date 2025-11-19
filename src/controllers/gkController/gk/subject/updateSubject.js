const mongoose = require('mongoose');
const GkSubject = require("../../../../models/gkModels");

const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { name, description, isActive,createdBy } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId.',
      });
    }

    // Build update object dynamically
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (isActive !== undefined) updateFields.isActive = isActive;
    if (createdBy !== undefined) updateFields.createdBy = createdBy;
    updateFields.updatedAt = Date.now();

    // Update subject
    const updatedSubject = await GkSubject.findByIdAndUpdate(
      subjectId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subject updated successfully.',
      data: updatedSubject
    });

  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating subject.',
      error: error.message
    });
  }
};

module.exports =  updateSubject
