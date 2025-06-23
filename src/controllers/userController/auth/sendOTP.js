const { OTPModel } = require('../../../models/authModels');
const { sendOtpToPhone } = require('../../../utils');

const sendOTP = async (req, res) => {
    try {
        const { number } = req.body;
        if (!number) {
            return res.status(400).json({ status: false, message: "Phone number is required" });
        }

        // Generate OTP 
        const otp = Math.floor(1000 + Math.random() * 9000);
        // expiry time
           const expiryTime = Date.now() + 10 * 60 * 1000;
        // const expiryTime = Date.now() + 10 * 60 * 1000; 

        const user = await OTPModel.findOne({ number });
        if (user) {
            // If user exists, update OTP and expiry time
            user.otp = otp;
            user.expiryTime = expiryTime;
            user.wrongAttampts = 0; // Increment attempts
            await user.save();
        } else {
            // If user does not exist, create a new OTP entry
            const newUser = new OTPModel({ number, otp, expiryTime });
            await newUser.save();
        }
        // Send OTP to phone number
        await sendOtpToPhone(number, otp);
        console.log('expiry time (raw):', user.expiryTime);
        console.log('expiry time (type):', typeof user.expiryTime);
        return res.status(200).json({ status: true, message: "OTP sent successfully", otp });
       
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}
module.exports = sendOTP;