const { Videogame,Genres } = require("../db");
const { getAllvideogames, getDbVideogames } = require("../utils/index")
const { API_KEY } = process.env;
require('dotenv').config();
const axios = require('axios')

const getVideogame = async (req,res) => {

    const name = req.query.name
    let gamesTotal = await getAllvideogames();
    if(name){
      let gameName = await gamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
      gameName.length ?
      res.status(200).json(gameName) :
      res.status(400).send("Missing game")
    }else{
      res.status(200).json(gamesTotal)
    }
}



const getVideogamesId= async( req,res) => {
  const  { id } = req.params;
  const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/
    if (regex.test(id)){
      const fromDB = await getDbVideogames(id)
      return res.json(fromDB)
    }
  
   else{ try {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      let { name, background_image, genres, description_raw, released, rating, platforms } = response.data;
      genres = genres.map(g => g.name); // de la API me trae un array de objetos, mapeo solo el nombre del genero
      platforms = platforms.map(p => p.platform.name); // de la API me trae un array de objetos, mapeo solo el nombre de la plataforma
      return res.json({
          
          name,
          background_image,
          genres,
          description_raw,
          released,
          rating,
          platforms
      })
  } catch (err) {
      return console.log(err)
  
    }
  }
  
}

const createVideogame = async (req,res) => {
  let { name, description, released, rating, genres, platforms, createInDb} = req.body;

  try {
      const newGame = await Videogame.create({ 
        
              createInDb, 
              name,
              description,
              released,
              rating,
              platforms,
              
              
          
      })

      const genresDb = await Genres.findAll({
          where:{name:genres}
      
        })   
          newGame.addGenres(genresDb)
  } catch (err) {
      console.log(err);
  }
  res.send('Created succesfully, saludos desde el BACK!!')

}
  
module.exports = {getVideogame, getVideogamesId, createVideogame}