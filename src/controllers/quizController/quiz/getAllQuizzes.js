const Quiz = require('../../../models/quizModels');

const getAllQuizzes = async (req, res) => {
  try {
    // Optional query filters
    const { category, isActive } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    // Fetch quizzes
    const quizzes = await Quiz.find(filter)
      .select('title description category timeLimit isActive createdAt updatedAt') // only useful fields
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      message: "Quizzes fetched successfully.",
      data: quizzes
    });
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching quizzes.",
      error: err.message
    });
  }
};

module.exports = getAllQuizzes ;
