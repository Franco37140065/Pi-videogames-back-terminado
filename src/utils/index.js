const { Videogame, Genres } = require("../db")
const axios = require("axios")
const { Op } = require('sequelize');
//const { API_KEY } = process.env;


const getApiVideogames =async () =>{
const apiVideogames = await axios.get(`https://api.rawg.io/api/games?key=dd5ac8bc618b4e5983fd505fc3de3e27`)
const apiVideosgamesClean = apiVideogames.data.results.map( e =>{

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
   
//     const dbVideogamesClean = dbVideosgames.map((e)=>{
//     return {
//         id:e.id,       
//         name:e.name, 
//         description:e.description, 
//         released:e.released, 
//         rating:e.rating , 
//         platforms:e.platforms,
//     };
// });
// return dbVideogamesClean
}
const getAllvideogames = async()=>{
const dbVideosgames = await getDbVideogames();
const apiVideosgames = await getApiVideogames();
return [...dbVideosgames,...apiVideosgames]
};
 




module.exports = {getAllvideogames,
}