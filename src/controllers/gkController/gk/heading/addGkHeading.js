const GkSubject=require('../../../../models/gkModels')

const addGkHeading = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { title, description, order } = req.body;

    if (!title) {
      return res.status(400).json({
        status: false,
        message: "Heading title is required",
      });
    }

    const subject = await GkSubject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({
        status: false,
        message: "Subject not found",
      });
    }

    // 🔍 Check for duplicate heading title (case-insensitive)
    const existingHeading = subject.headings.find(
      h => h.title.toLowerCase().trim() === title.toLowerCase().trim()
    );

    if (existingHeading) {
      return res.status(409).json({
        status: false,
        message: "Heading with this title already exists in the subject",
      });
    }

    // ✅ If no duplicate, add heading
    const newHeading = {
      title,
      description: description || '',
      qaPairs: [],
      order: order || 0,
      createdAt: new Date(),
    };

    subject.headings.push(newHeading);
    await subject.save();

    return res.status(201).json({
      status: true,
      data: newHeading,
      message: "Heading added successfully",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = addGkHeading;
