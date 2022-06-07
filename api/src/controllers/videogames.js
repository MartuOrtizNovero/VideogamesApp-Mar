const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;



const apiGames = async () => {

    let allGames = [];// voy metiendo lo que voy iterando en cada pagina
    for (i = 1; i < 6; i++) {// aca itero paginas por  eso empiezo en 1
        let currentUrl = axios.get(// pagina actual donde estoy parado y guardo TODO {}
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
        );
        let apiInfo = currentUrl // Aca guardo la info mapeada 
            .then((res) =>
                res.data.results.map((e) => {
                    return {
                        id: e.id,
                        name: e.name,
                        img: e.background_image,
                        description: e.description,
                        genres: e.genres.map((g) => g.name),
                        platforms: e.platforms.map((p) => p.platform.name),
                        rating: e.rating,
                        releaseDate: e.released,
                    };
                })
            )
            .catch((error) => { console.log(error) }) // informacion mas detallada del error

        allGames = allGames.concat(apiInfo);//[[]]
        /* [...allGames, apiInfo]; */
    }

    return Promise.all(allGames).then((r) => r.flat()); // [[{},{},{}]]
}

const dbGames = async () => {
    const infoDB = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    return infoDB;
}

const allVg = async () => {
    try {

        const gamesDb = await dbGames();
        const gamesApi = await apiGames();
        if (gamesDb) {
            const total = await gamesDb.concat(gamesApi);
            return total;
        } else {
            return gamesApi;
        }

        /*   return Promise.all([dbGames(), apiGames()]).then((r) => r.flat()); */
    } catch (err) {
        console.log(err);
    }
}

const apiPlatforms = async () => {

    let allPlat = [];
    for (i = 1; i < 6; i++) {
        let currentUrl = axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
        );
        let apiPlat = currentUrl
            .then((res) =>
                res.data.results.map((e) => {
                    return {
                        platforms: e.platforms.map((p) => p.platform.name)
                    };
                })
            )
            .catch((error) => { console.log(error) });
        allPlat = allPlat.concat(apiPlat);  //[[{ platforms: ["p","p","p"]}]]
    }
    return Promise.all(allPlat)
        .then((r) => r.flat())// [{ platforms: ["a","p","p"]}]
        .then((p) => p.map(c => c.platforms.filter(pl => pl))) // toma de cada elemento del array y devuelve un nuevo array con cada elemento [["a","p","p"]]
        .then((l) => l.flat().filter((el, i, array) => {// estamos sacando los repetidos
            return i === array.indexOf(el)// devuelve no repetidos
            //   [1,2,3,1]   estoy comparando el indice del array con el indice del valor del numero  ej: incide 0 y valor 1 , indice 3 valor 1, aca
        }));// i  0 1 2 3    los valores son repetidos por eso no devuelve los repetidos 

}

module.exports = {
    allVg,
    apiGames,
    apiPlatforms
}