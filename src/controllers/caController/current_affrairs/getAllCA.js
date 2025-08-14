const CurrentAffairs = require('../../../models/currentAffrairsModels');

const getCurrentAffairs = async (req, res) => {
  try {
    const { date, category, isImportant, search, page = 1, limit = 10 } = req.query;

    let filters = {};

    // Date filter (entire day range)
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      filters.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (category) {
      filters.category = category;
    }

    if (isImportant !== undefined) {
      filters.isImportant = isImportant === 'true';
    }

    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const currentAffairs = await CurrentAffairs.find(filters)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await CurrentAffairs.countDocuments(filters);

    res.status(200).json({
      success: true,
      page: parseInt(page),
      totalPages: Math.ceil(totalCount / limit),
      totalRecords: totalCount,
      data: currentAffairs
    });
  } catch (error) {
    console.error("Error fetching current affairs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch current affairs",
      error: error.message
    });
  }
};

module.exports = getCurrentAffairs;


// 📌 Example Requests

// 1️⃣ Get All Current Affairs (No Filters)

// GET http://localhost:5000/api/current-affairs


// 2️⃣ Filter by Category & Importance

// GET http://localhost:5000/api/current-affairs?category=Sports&isImportant=true


// 3️⃣ Filter by Date

// GET http://localhost:5000/api/current-affairs?date=2025-08-14


// 4️⃣ Pagination

// GET http://localhost:5000/api/current-affairs?page=2&limit=5