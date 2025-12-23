const fs = require("fs");
const path = require("path");
const Banners = require("../../../models/banners");

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description,isActive,redirectUrl } = req.body;

    // 🔍 Find banner
    const banner = await Banners.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    // 🖼️ Handle new uploaded image (if any)
    if (req.files && req.files.image && req.files.image.length > 0) {
      const newImageFile = req.files.image[0];
      const newImagePath = `/public/Banners/${newImageFile.filename}`;

      // Delete old image if it exists
      if (banner.image && fs.existsSync(path.join(__dirname, `../../../${banner.image}`))) {
        fs.unlinkSync(path.join(__dirname, `../../../${banner.image}`));
      }

      banner.image = newImagePath;
    }

    // 📝 Update other fields
    if (title) banner.title = title;
    if (description) banner.description = description;
    if (redirectUrl) banner.redirectUrl = redirectUrl;
    if (isActive) banner.isActive = isActive;

    // 💾 Save changes
    await banner.save();

    res.status(200).json({
      success: true,
      message: "Banner updated successfully!",
      data: banner,
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating banner.",
      error: error.message,
    });
  }
};

module.exports = updateBanner;
