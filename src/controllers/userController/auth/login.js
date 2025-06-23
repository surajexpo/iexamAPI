const { User } = require("../../../models/authModels");
const bcrypt = require("bcrypt");
const {
  jwtAuthMiddleware,
  generateToken,
} = require("../../../utils/generateToken");
const login = async (req, res,next) => {
  const { email, password } = req.body;
  try {
    // 1) Check if email and password exist
    if (!email || !password) {
        return res.status(400).json({ 
          status: "error",
          message: "Please provide both email and password!" 
        });
      }
    const user = await User.findOne({email}).select("+password");
    if (!user) {
        return res.status(401).json({ 
          status: "error",
          message: "Invalid credentials" 
        });
      }
      const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        status: "error",
        message: "Invalid credentials" 
      });
    }
    const token = generateToken({
        id: user._id, 
        email: user.email
      });
    res.status(200).json({
        status: "success",
        token,
        data: {
          user: {
            id: user._id,
            email: user.name,
            // Add other non-sensitive user fields if needed
          }
        }
      });
  
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      status: "error",
      message: "An unexpected error occurred" 
    });
  }
};
module.exports = login;
