const CurrentAffairs = require('../../../models/currentAffrairsModels');

const deleteCurrentAffairs = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecord = await CurrentAffairs.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Current affair not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Current affair deleted successfully",
      data: deletedRecord
    });
  } catch (error) {
    console.error("Error deleting current affair:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete current affair",
      error: error.message
    });
  }
};

module.exports = deleteCurrentAffairs;
