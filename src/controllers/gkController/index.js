const addSubject = require("./gk/subject/addSubject");
const updateSubject = require("./gk/subject/updateSubject");
const deleteSubject = require("./gk/subject/deleteSubject");
const getAllSubjects = require("./gk/subject/getAllSubjects");

const addGkHeading = require("./gk/heading/addGkHeading");
const updateGkHeading = require("./gk/heading/updateGkHeading");
const deleteGkHeading=require("./gk/heading/deleteGkHeading")
const getAllGkHeadings=require("./gk/heading/getAllGkHeadings")
const addGkQA=require("./gk/gkquestion/addGkQA");
const updateGkQA=require("./gk/gkquestion/updateGkQA");
const deleteGkQA=require("./gk/gkquestion/deleteGkQA");
const getAllQuestionAnswers = require("./gk/gkquestion/getAllGkQA");
module.exports = {
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
};
