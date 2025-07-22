const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId.',
      });
    }

    const deletedSubject = await GkSubject.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subject deleted successfully.',
      data: deletedSubject,
    });

  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting subject.',
      error: error.message,
    });
  }
};

module.exports =  deleteSubject ;
