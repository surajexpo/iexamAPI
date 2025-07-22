const gkRoute = require("express").Router();
const {
  addSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects,
  addGkHeading,
  updateGkHeading,
  deleteGkHeading,
  getAllGkHeadings,
  addGkQA,
  updateGkQA,
  deleteGkQA,
  getAllQuestionAnswers
} = require("../controllers/gkController");

//subject routes
gkRoute.get("/getAllSubject", getAllSubjects);
gkRoute.post("/addSubject", addSubject);
gkRoute.put("/updateSubject/:subjectId", updateSubject);
gkRoute.delete("/deleteSubject/:subjectId", deleteSubject);
//heading routes
gkRoute.get("/gkSubject/:subjectId/getAllHeadings",getAllGkHeadings)
gkRoute.post("/gkSubject/:subjectId/addHeading", addGkHeading);
gkRoute.put("/gkSubject/:subjectId/updateHeading/:headingId", updateGkHeading);
gkRoute.delete("/gkSubject/:subjectId/deleteHeading/:headingId", deleteGkHeading);
//question and answer
gkRoute.post("/gkSubject/:subjectId/:headingId/add-question-answer",addGkQA);
gkRoute.put("/gkSubject/:subjectId/:headingId/updateqa/:qaId",updateGkQA);
gkRoute.delete("/gkSubject/:subjectId/:headingId/deleteqa/:qaId",deleteGkQA);
gkRoute.get("/gkSubject/:subjectId/:headingId/getAllQA",getAllQuestionAnswers);




module.exports=gkRoute;
