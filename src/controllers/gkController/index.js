const addSubject = require("./gk/subject/addSubject");
const updateSubject = require("./gk/subject/updateSubject");
const deleteSubject=require('./gk/subject/deleteSubject');
const getAllSubjects=require('./gk/subject/getAllSubjects');

const addGkHeading=require('./gk/heading/addGkHeading')
module.exports = { addSubject,updateSubject,deleteSubject,getAllSubjects,addGkHeading};
