const userRoute = require("express").Router();
const { profile, updateProfile, sendOTP, verifyOTP, signup,login } = require("../controllers/userController");
const { authenticateUser, fileUploader } = require("../middlewares");

//---------- user auth ----------
userRoute.post("/profile", authenticateUser, profile);
userRoute.post("/updateprofile", authenticateUser, fileUploader(
    [
        { name: "avtar", maxCount: 1 },

    ],
    "User"
), updateProfile);
userRoute.post("/sendOTP", sendOTP);
userRoute.post("/verifyOTP", verifyOTP);

userRoute.post("/signup",signup);
userRoute.post("/login",login);

module.exports = userRoute;