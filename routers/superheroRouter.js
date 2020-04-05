const express = require("express");
const superheroController = require("../controllers/superheroController.js");
const superheroRouter = express.Router();

// superheroRouter.use("/postImage", superheroController.postImage);
superheroRouter.use("/postSuperhero", superheroController.postSuperhero);
superheroRouter.use("/create", superheroController.createSuperhero);
superheroRouter.use("/superhero:id",superheroController.getSuperheroId);
superheroRouter.use("/edit:id",superheroController.getSuperheroId);
superheroRouter.use("/delete:id", superheroController.delSuperhero);
superheroRouter.use("/putSuperhero:id", superheroController.putSuperhero);
superheroRouter.use("/", superheroController.getSuperheroes);

module.exports = superheroRouter;
