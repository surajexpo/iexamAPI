const GkSubject = require("../../../../models/gkModels");

const updateSubject = async (req, res) => {
  GkSubject
  try {
    const { subjectId } = req.params;
    const { name, description, isActive } = req.body;

    // Build update object dynamically
    console.log(subjectId," ____ ",name," ",description);
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (description !== undefined) updateFields.description = description;
    if (isActive !== undefined) updateFields.isActive = isActive;
    updateFields.updatedAt = Date.now();

    // Update subject
    const updatedSubject = await GkSubject.findByIdAndUpdate(
      subjectId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({
        status: false,
        message: 'Subject not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: updatedSubject,
      message: 'Subject updated successfully',
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = updateSubject;
