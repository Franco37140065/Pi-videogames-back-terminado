const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getVideogame, getVideogames, createVideogame}= require ("../Controllers/VideogameControllers");
const {validate} = require ("../middlewares.js")
const videogame = Router();



videogame.get("/", getVideogame);

videogame.get("/:id",getVideogames)

videogame.post("/", validate,createVideogame);

module.exports = videogame;