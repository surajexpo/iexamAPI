const { User, OTPModel } = require("../../../models/authModels");

const verifyOTP = async (req, res) => {
    try {
        const { number, otp } = req.body;
        if (!number || !otp) {
            return res.status(400).json({ status: false, message: "Phone number and OTP are required" });
        }

        // Find the user by phone number
        const user = await OTPModel.findOne({ number });
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        if (user.wrongAttampts >= 3) {
            return res.status(400).json({ status: false, message: "Too many wrong attempts" });
        }
        // Check if the OTP has expired
        const currentTime = Date.now();
        
        if (Date.now() > user.expiryTime) {
            return res.status(400).json({ status: false, message: "OTP has expired" });
        }

        // Check if the OTP is correct and not expired
        if (user.otp !== otp) {
            user.wrongAttampts += 1; // Increment attempts
            await user.save();
            return res.status(400).json({ status: false, message: "Invalid OTP" });
        }



        // If OTP is valid, create a new user or update existing user
        let newUser = await User.findOne({ number: number });
        if (!newUser) {
            newUser = new User({ number: number });
            await newUser.save();
        }

        return res.status(200).json({ status: true, message: "OTP verified successfully", user: newUser });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status:false, message: "Internal server error" });
    }
}
module.exports = verifyOTP;