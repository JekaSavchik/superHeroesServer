const express = require("express");
const superheroController = require("../controllers/superheroController.js");
const superheroRouter = express.Router();

superheroRouter.use("/postSuperhero", superheroController.postSuperhero);
superheroRouter.use("/create", superheroController.createSuperhero);
superheroRouter.use("/", superheroController.getSuperhero);

module.exports = superheroRouter;
