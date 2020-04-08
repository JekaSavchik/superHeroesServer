const express = require("express");
const superheroController = require("../controllers/superheroController.js");
var bodyParser = require("body-parser");

const superheroRouter = express.Router();
var jsonParser = bodyParser.json();

superheroRouter.use("/postSuperhero", superheroController.postSuperhero);
superheroRouter.use("/create", superheroController.createSuperhero);
superheroRouter.use("/dossier:id",superheroController.getSuperheroId);
superheroRouter.use("/edit:id",superheroController.getSuperheroId);
superheroRouter.use("/delete:id", superheroController.delSuperhero);
superheroRouter.post("/putSuperheroImg:id", jsonParser, superheroController.putSuperheroImg);
superheroRouter.use("/putSuperhero:id", superheroController.putSuperhero);
superheroRouter.use("/", superheroController.getSuperheroes);

module.exports = superheroRouter;
