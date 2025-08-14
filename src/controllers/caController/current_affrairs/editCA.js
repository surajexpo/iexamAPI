const CurrentAffairs = require('../../../models/currentAffrairsModels');

const editCurrentAffairs = async (req, res) => {
  try {
    const { id } = req.params; // Current affair ID from URL
    const { title, description, category, date, isImportant } = req.body;

    // Check if record exists
    const existingRecord = await CurrentAffairs.findById(id);
    if (!existingRecord) {
      return res.status(404).json({
        success: false,
        message: "Current affair not found"
      });
    }

    // Update fields only if provided
    if (title !== undefined) existingRecord.title = title;
    if (description !== undefined) existingRecord.description = description;
    if (category !== undefined) existingRecord.category = category;
    if (date !== undefined) existingRecord.date = new Date(date);
    if (isImportant !== undefined) existingRecord.isImportant = isImportant;

    await existingRecord.save();

    res.status(200).json({
      success: true,
      message: "Current affair updated successfully",
      data: existingRecord
    });
  } catch (error) {
    console.error("Error updating current affair:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update current affair",
      error: error.message
    });
  }
};

module.exports = editCurrentAffairs;
