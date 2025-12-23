const path = require('path');
const Banners = require('../../../models/banners');

const addBanner = async (req, res) => {
  try {
    const { title, description,isActive,redirectUrl } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required.",
      });
    }

    // Handle image upload (if any)
    let imagePath = "";
    if (req.files && req.files.image && req.files.image.length > 0) {
      imagePath = `/public/Banners/${req.files.image[0].filename}`;
    } else {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    const banner = new Banners({
      title,
      image: imagePath,
      description: description || "",
      redirectUrl,
      isActive,
    });

    await banner.save();

    res.status(201).json({
      success: true,
      message: "Banner created successfully!",
      data: banner,
    });
  } catch (error) {
    console.error("Error adding banner:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating banner.",
      error: error.message,
    });
  }
};

module.exports = addBanner;
