const GkSubject = require("../../../../models/gkModels");

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await GkSubject.find({}, 'name description isActive createdAt updatedAt createdBy');
    res.status(200).json({
      success: true,
      message: 'Subjects fetched successfully.',
      data: subjects
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching subjects.',
      error: error.message
    });
  }
};

module.exports =  getAllSubjects ;
