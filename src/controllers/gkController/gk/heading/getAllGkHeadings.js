const GkSubject = require('../../../../models/gkModels');

const getAllGkHeadings = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await GkSubject.findById(subjectId).select('name headings');

    if (!subject) {
      return res.status(404).json({
        status: false,
        message: 'Subject not found',
      });
    }

    return res.status(200).json({
      status: true,
      subjectName: subject.name,
      data: subject.headings,
      message: 'Headings fetched successfully',
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = getAllGkHeadings;
