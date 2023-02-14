const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Genres } = require('../db')
const axios = require("axios")

const genresRouter = Router();

genresRouter.get("/",async (req, res)=>{
    try {
        // si ya los tengo cargados en la DB los consumo desde alli.
        const genresDb = await Genres.findAll();
        if (genresDb.length) return res.status(200).json(genresDb)
        
        //else --> los voy a buscar a la API
        const response = await axios.get(`https://api.rawg.io/api/genres?key=dd5ac8bc618b4e5983fd505fc3de3e27`);
        const genres = response.data.results; // recibo un array de objetos, con los juego filtrados por GENERO
        //los guardo en la DB filtrando solo el nombre
        genres.forEach(async g => {
            await Genres.findOrCreate({
                where: {
                    name: g.name
                }
            })
        })
        //(OPTIMIZADO) --> SOLO ENVIO AL FRONT LA INFO NECESARIA (nombre de los generos)
        const genresReady = genres.map(game => {
            return{
                id: game.id,
                name: game.name
            }
        });
        res.status(200).json(genresReady)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})

module.exports = genresRouter;
