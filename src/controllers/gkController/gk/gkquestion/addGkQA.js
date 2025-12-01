const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');
const User = require('../../../../models/authModels/userModel');

const addQuestionAnswer = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;
    const { question, answer, createdBy } = req.body;

    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(subjectId) ||
        !mongoose.Types.ObjectId.isValid(headingId) ||
        (createdBy && !mongoose.Types.ObjectId.isValid(createdBy))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId, headingId, or createdBy.',
      });
    }

    // Validate required fields
    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and Answer are required.",
      });
    }

    // Validate createdBy user
    if (createdBy) {
      const userExists = await User.findById(createdBy);
      if (!userExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid createdBy: User not found.",
        });
      }
    }

    // Find subject
    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    // Find heading
    const heading = subject.headings.id(headingId);
    if (!heading) {
      return res.status(404).json({
        success: false,
        message: "Heading not found.",
      });
    }

    // Add the Q&A pair
    const newQAPair = {
      question: question.trim(),
      answer: answer.trim(),
      createdBy: createdBy || null,
    };

    heading.qaPairs.push(newQAPair);
    subject.updatedAt = new Date();
    await subject.save();

    return res.status(201).json({
      success: true,
      message: "Q&A added successfully.",
      data: newQAPair
    });

  } catch (error) {
    console.error('Error adding Q&A:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while adding Q&A.',
      error: error.message
    });
  }
};

module.exports =  addQuestionAnswer ;
