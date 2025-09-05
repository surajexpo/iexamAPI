const userRoute = require("express").Router();
const { updateUserProfile, updateProfile, sendOTP, verifyOTP, signup,login,getUserById,getAllUsers ,changePassword} = require("../controllers/userController");
const { authenticateUser, fileUploader } = require("../middlewares");

//---------- user auth ----------
// userRoute.post("/profile", authenticateUser, profile);
userRoute.put("/:userId/profile", updateUserProfile);
userRoute.get("/:userId", getUserById);
userRoute.put("/:userId/change-password", changePassword);
userRoute.get("/", getAllUsers);
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