const mongoose = require('mongoose');
const GkSubject = require('../../../../models/gkModels');

const addGkHeading = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { title, description, order, } = req.body;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid subjectId.',
      });
    }

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Heading title is required.",
      });
    }

    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    const existingHeading = subject.headings.find(
      h => h.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (existingHeading) {
      return res.status(409).json({
        success: false,
        message: "Heading with this title already exists in the subject.",
      });
    }

    const newHeading = {
      title: title.trim(),
      description: description?.trim() || '',
      qaPairs: [],
      order: order || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    subject.headings.push(newHeading);
    subject.updatedAt = new Date();
    await subject.save();

    res.status(201).json({
      success: true,
      message: "Heading added successfully.",
      data: newHeading
    });

  } catch (error) {
    console.error('Error adding heading:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding heading.',
      error: error.message,
    });
  }
};

module.exports =  addGkHeading ;
