const GkSubject = require('../../../../models/gkModels');
const User=require('../../../../models/authModels/userModel')
const addQuestionAnswer = async (req, res) => {
  try {
    const { subjectId, headingId } = req.params;
    const { question, answer, createdBy } = req.body;
    if (!question || !answer) {
      return res.status(400).json({
        status: false,
        message: "Question and Answer are required",
      });
    }
    if (createdBy) {
        const userExists = await User.findById(createdBy);
        if (!userExists) {
          return res.status(400).json({
            status: false,
            message: "Invalid createdBy: User not found",
          });
        }
      }

    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }
    const heading = subject.headings.id(headingId);
    if (!heading) {
      return res.status(404).json({
        status: false,
        message: "Heading not found",
      });
    }

    // Add the Q&A pair
    const newQAPair = {
      question,
      answer,
      createdBy: createdBy || null,
      lastUpdated: new Date()
    };

    heading.qaPairs.push(newQAPair);
    subject.updatedAt = new Date();
    await subject.save();

    return res.status(201).json({
      status: true,
      data: newQAPair,
      message: "Q&A added successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
module.exports = addQuestionAnswer;
