
const adminRoute = require("express").Router();
const { authenticateAdmin } = require("../middlewares");
const { login, profile, update, register, forgetPassword, verifyOTP, resetPassword } 
= require('../controllers/adminController');
const { addSubject, updateSubject, deleteSubject } = require("../controllers/gkController");

adminRoute.post("/register", authenticateAdmin, register);

adminRoute.post("/login", login)
adminRoute.get("/profile", authenticateAdmin, profile);
adminRoute.put("/update", authenticateAdmin, update);
adminRoute.post("/register", authenticateAdmin, register);

//forget password
adminRoute.post("/forgetPassword", forgetPassword);
adminRoute.post("/verifyOTP", verifyOTP);
adminRoute.post("/resetPassword", resetPassword);
//gks
adminRoute.post("/addSubject",addSubject);
adminRoute.put("/updateSubject/:subjectId",updateSubject);
adminRoute.delete("/deleteSubject/:subjectId",deleteSubject);
adminRoute.get("/getSubjectById/:subjectId",deleteSubject);
adminRoute.get("/getAllSubject",deleteSubject);





module.exports = adminRoute;
