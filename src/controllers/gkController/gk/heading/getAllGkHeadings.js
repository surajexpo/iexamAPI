const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const getAllGkHeadings = async (req, res) => {
  try {
    const { subjectId } = req.params;

    // Validate subjectId
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId.',
      });
    }

    const subject = await GkSubject.findById(subjectId).select('name headings');
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Headings fetched successfully.',
      subjectName: subject.name,
      data: subject.headings
    });

  } catch (error) {
    console.error('Error fetching headings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching headings.',
      error: error.message
    });
  }
};

module.exports =  getAllGkHeadings ;
