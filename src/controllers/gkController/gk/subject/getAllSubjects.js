
const GkSubject = require("../../../../models/gkModels");

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await GkSubject.find({}, 'name description isActive createdAt updatedAt');

    return res.status(200).json({
      status: true,
      data: subjects,
      message: 'Subjects fetched successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = getAllSubjects;
