const Quiz = require('../../../models/quizModels');

const getCategories = (req, res) => {
  try {
    const categories = Quiz.schema.path('category').enumValues;
    return res.status(200).json({
      success: true,
      data: categories,
      message: 'Quiz categories fetched successfully.'
    });
  } catch (err) {
    console.error('Error fetching categories:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching categories.',
      error: err.message
    });
  }
};

module.exports =  getCategories ;
