const caRoute = require("express").Router();
const {
  addCurrentAffairs,
  getCurrentAffairs,
  editCurrentAffairs,
  deleteCurrentAffairs

} = require("../controllers/caController");

//subject routes

caRoute.post("/add_currentaffairs", addCurrentAffairs);
caRoute.get("/get_currentaffairs", getCurrentAffairs);
caRoute.put("/edit_currentaffairs/:id", editCurrentAffairs);
caRoute.delete("/delete_currentaffairs/:id", deleteCurrentAffairs);
module.exports=caRoute;
