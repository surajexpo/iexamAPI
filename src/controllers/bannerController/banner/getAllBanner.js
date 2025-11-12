const Banners = require("../../../models/banners");

const getAllBanners = async (req, res) => {
  try {
    // 📥 Get query params for pagination & search
    const { page = 1, limit = 10, search = "" } = req.query;

    // 🔍 Build search filter
    const filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // 📊 Count total banners
    const totalBanners = await Banners.countDocuments(filter);

    // 🧮 Pagination logic
    const skip = (page - 1) * limit;

    // 📦 Fetch banners
    const banners = await Banners.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 }); // latest first

    // ✅ Send response
    res.status(200).json({
      success: true,
      message: "Banners fetched successfully.",
      data: banners,
      pagination: {
        totalBanners,
        currentPage: Number(page),
        totalPages: Math.ceil(totalBanners / limit),
        pageSize: Number(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching banners.",
      error: error.message,
    });
  }
};

module.exports = getAllBanners;
