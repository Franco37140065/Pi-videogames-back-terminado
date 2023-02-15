const { Videogame,Genres } = require("../db");
const { getAllvideogames } = require("../utils/index")









const getVideogame = async (req,res) => {

    // const{ name }= req.query;
    // const findVideogame = () => {};
    // let results = name ? findVideogame() : await getAllvideogames();
    // res.status(200).json(results)

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
      const { name, description, released, rating, platforms,createdInDb,genres} = req.body;
      const newGame = await Videogame.create ({
      name, description, released, rating, platforms,createdInDb});
      //console.log(newGame)
      const genresDb = await Genres.findAll({
        where:{name:genres}

      })
      
      newGame.addGenres(genresDb)
      
     // res.status(200).json(newGame);
      res.send("Juego creado con exito")
      //console.log(newGame)
    
   } catch (error) {
    res.status(400).json({error: error.message})
   }
  

       
};
module.exports = {getVideogame, getVideogamesId, createVideogame}