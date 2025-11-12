const fs = require("fs");
const path = require("path");
const Banners = require("../../../models/banners");

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find banner by ID
    const banner = await Banners.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found.",
      });
    }

    // 2️⃣ Delete image from filesystem (if exists)
    if (banner.image) {
      const imagePath = path.join(__dirname, `../../../${banner.image}`);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 3️⃣ Delete banner from MongoDB
    await Banners.findByIdAndDelete(id);

    // 4️⃣ Send response
    return res.status(200).json({
      success: true,
      message: "Banner deleted successfully.",
    });

  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting banner.",
      error: error.message,
    });
  }
};

module.exports = deleteBanner;
