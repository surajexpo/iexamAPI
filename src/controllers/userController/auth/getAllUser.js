const { User } = require("../../../models/authModels");

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    // Dynamically build filter
    const filter = {};
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },   // in case schema uses "name"
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // Fetch users (exclude password, sort safely)
    const users = await User.find(filter)
      .select("-password")
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 }); // works only if schema has timestamps

    const totalUsers = await User.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
      pagination: {
        totalUsers,
        currentPage: pageNum,
        totalPages: Math.ceil(totalUsers / limitNum),
        pageSize: limitNum,
      },
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users.",
      error: err.message,
    });
  }
};

module.exports = getAllUsers;
