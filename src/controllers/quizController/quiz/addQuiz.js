const Quiz = require('../../../models/quizModels'); // adjust path if needed

// Add a new quiz
const addQuiz = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      timeLimit,
      questions,
      createdBy
    } = req.body;

    // Validate required fields
    if (!title || !createdBy) {
      return res.status(400).json({
        success: false,
        message: 'Title and createdBy are required.'
      });
    }

    // Create new Quiz document
    const newQuiz = new Quiz({
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category || 'Other',
      timeLimit: timeLimit || 20,
      createdBy,
      questions: Array.isArray(questions) ? questions : []
    });

    // Save to DB
    const savedQuiz = await newQuiz.save();

    return res.status(201).json({
      success: true,
      message: 'Quiz created successfully!',
      data: savedQuiz
    });
  } catch (err) {
    console.error('Error adding quiz:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while creating quiz.',
      error: err.message
    });
  }
};

module.exports =  addQuiz ;
