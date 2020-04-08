const express = require("express");
const superheroController = require("../controllers/superheroController.js");
const superheroRouter = express.Router();

superheroRouter.use("/postSuperhero", superheroController.postSuperhero);
superheroRouter.use("/create", superheroController.createSuperhero);
superheroRouter.use("/dossier:id",superheroController.getSuperheroId);
superheroRouter.use("/edit:id",superheroController.getSuperheroId);
superheroRouter.use("/delete:id", superheroController.delSuperhero);
superheroRouter.use("/putSuperheroImg:id", superheroController.putSuperheroImg);
superheroRouter.use("/putSuperhero:id", superheroController.putSuperhero);
superheroRouter.use("/", superheroController.getSuperheroes);

module.exports = superheroRouter;
