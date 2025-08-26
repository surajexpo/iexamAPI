const mongoose = require("mongoose");
const {User} = require("../../../models/authModels"); 

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId."
      });
    }

    // Find user and exclude password
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: user
    });

  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user.",
      error: err.message
    });
  }
};

module.exports = getUserById;
