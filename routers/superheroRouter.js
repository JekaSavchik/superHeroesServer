const express = require("express");
const superheroController = require("../controllers/superheroController.js");
const superheroRouter = express.Router();

superheroRouter.use("/postSuperhero", superheroController.postSuperhero);
superheroRouter.use("/create", superheroController.createSuperhero);
superheroRouter.use("/superhero:id",superheroController.getSuperheroId);
superheroRouter.use("/delete:id", superheroController.delSuperhero);
superheroRouter.use("/", superheroController.getSuperhero);

superheroRouter.use("/upload", superheroController.postImage);

module.exports = superheroRouter;
