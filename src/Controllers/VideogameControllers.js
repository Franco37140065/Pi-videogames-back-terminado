const { Videogame,Genres } = require("../db");
const { getAllvideogames } = require("../utils/index")
const axios = require("axios")








const getVideogame = async (req,res) => {

    const{ name }= req.query;
    const findVideogame = () => {};
    let results = name ? findVideogame() : await getAllvideogames();
    res.status(200).json(results)
}



const getVideogames= async( req,res) => {
  const  { id} = req.params;
  const response = await getAllvideogames();
  
    if(id ){
      let gamesId = response.filter(e => e.id == id)
      gamesId.length?
      res.status(200).json(gamesId):
      res.status(400).send("no se encontro el juego")
}
   
}


const createVideogame = async (req,res) => {
   try {
      const { name, description, released, rating, platforms,genres} = req.body;
      const newGame = await Videogame.create ({
      name, description, released, rating, platforms});
      //console.log(newGame)
      const genresDb = await Genres.findAll({
        where:{name:genres}

      })
      newGame.addGenres(genresDb)
      
      res.status(200).json(newGame);

      //console.log(newGame)
    
   } catch (error) {
    res.status(400).json({error: error.message})
   }
  

       
};
module.exports = {getVideogame, getVideogames, createVideogame}