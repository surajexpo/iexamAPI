// controllers/currentAffairsController.js
const CurrentAffairs = require('../../../models/currentAffrairsModels');

// Add a new Current Affair
const addCurrentAffairs = async (req, res) => {
  try {
    const {
      title,
      description,
      createdBy,
      summary,
      date,
      category,
      source,
      isImportant,
      tags,
      imageUrl,
      relatedLinks
    } = req.body;

    // Create and save to DB
    const currentAffair = new CurrentAffairs({
      title,
      description,
      createdBy,
      summary,
      date,
      category,
      source,
      isImportant,
      tags,
      imageUrl,
      relatedLinks
    });

    await currentAffair.save();

    res.status(201).json({
      success: true,
      message: "Current affair added successfully",
      data: currentAffair
    });
  } catch (error) {
    console.error("Error adding current affair:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add current affair",
      error: error.message
    });
  }
};
module.exports = addCurrentAffairs;
