require('dotenv').config();
const { Videogame, Genres } = require("../db")
const axios = require("axios")

const { API_KEY } = process.env;


const getApiVideogames =async () =>{
  
    let allGames = [];
    for (let i=1;i<6;i++) {
const apiVideogames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
allGames = allGames.concat(apiVideogames.data.results);
    }
const apiVideosgamesClean = allGames.map( e =>{

    return {
        id:e.id,       
        name:e.name, 
        description:e.description,
        background_image: e.background_image, 
        released:e.released, 
        rating:e.rating , 
        platforms:e.platforms.map(p => p.platform.name),
        genres: e.genres.map(g => g.name)
    };
});
return apiVideosgamesClean

}
const getDbVideogames = async()=>{
    return  await Videogame.findAll({include:{
        model:Genres,
        attributes:["name"],
        through:{
            attributes: [],
        },
}})
   
}
const getAllvideogames = async()=>{
const dbVideosgames = await getDbVideogames();
const apiVideosgames = await getApiVideogames();
return [...dbVideosgames,...apiVideosgames]
};
 




module.exports = {getAllvideogames,getDbVideogames
}