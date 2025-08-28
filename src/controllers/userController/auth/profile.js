const mongoose = require("mongoose");
const { User } = require("../../../models/authModels"); 
const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params; // userId from URL
    const updates = req.body; // data from request body

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId."
      });
    }

    // Only allow specific fields to be updated
    const allowedUpdates = [
      "name",
      "mobile_number",
      "profileImage",
      "address.street",
      "address.city",
      "address.state",
      "address.zipCode",
      "address.country"
    ];

    // Filter updates to prevent updating restricted fields
    const filteredUpdates = {};
    for (const key of allowedUpdates) {
      const keys = key.split(".");
      if (keys.length === 1 && updates[keys[0]] !== undefined) {
        filteredUpdates[keys[0]] = updates[keys[0]];
      } else if (keys.length === 2 && updates[keys[0]]?.[keys[1]] !== undefined) {
        if (!filteredUpdates[keys[0]]) filteredUpdates[keys[0]] = {};
        filteredUpdates[keys[0]][keys[1]] = updates[keys[0]][keys[1]];
      }
    }

    
    // Find user and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedUser
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile.",
      error: err.message
    });
  }
};

module.exports = updateUserProfile;
