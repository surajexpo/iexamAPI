const GkSubject = require('../../../models/gkModels');

const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const deletedSubject = await GkSubject.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      return res.status(404).json({
        status: false,
        message: 'Subject not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: deletedSubject,
      message: 'Subject deleted successfully',
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = deleteSubject;
