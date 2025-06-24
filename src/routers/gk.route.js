const gkRoute = require("express").Router();
const {
  addSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
  addGkHeading,
} = require("../controllers/gkController");

//subject routes
gkRoute.get("/getAllSubject", getAllSubjects);
gkRoute.post("/addSubject", addSubject);
gkRoute.put("/updateSubject/:subjectId", updateSubject);
gkRoute.delete("/deleteSubject/:subjectId", deleteSubject);
gkRoute.get("/getSubjectById/:subjectId", deleteSubject);
//heading routes
gkRoute.post("/gkSubject/:subjectId/addHeading", addGkHeading);

module.exports=gkRoute;
