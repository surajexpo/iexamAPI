const { User } = require("../../../models/authModels");
const { generateToken } = require("../../../utils/generateToken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Basic validation
    if (!email || !password ) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required",
      });
    }

    // Check if user already exists
    const isExist = await User.findOne({ email }).lean();
    if (isExist) {
      return res.status(409).json({
        status: false,
        message: "Email already exists",
      });
    }

    const userData = new User({
      email,
      password,
      name,
      
    });

    await userData.save();

    // Generate token
    const token = generateToken({ _id: userData._id });

    return res.status(201).json({
      status: true,
      message: "Successfully signed up",
      result: {
        user: {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
        
        },
        token,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ status: false, error: err.message });
  }
};

module.exports = signup;