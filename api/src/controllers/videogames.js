const axios = require("axios");
const { Videogame, Genre } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;



const apiGames = async () => {

    let allGames = [];
    for (i = 1; i < 6; i++) {
        let currentUrl = axios.get(
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
        );
        let apiInfo = currentUrl
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
            .catch((error) => { console.log(error) })

        allGames = allGames.concat(apiInfo);

    }

    return Promise.all(allGames).then((r) => r.flat());
}

const dbGames = async () => {
    const infoDB = await Videogame.findAll({
        include: [Genre]
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
        allPlat = allPlat.concat(apiPlat);
    }
    return Promise.all(allPlat)
        .then((r) => r.flat())
        .then((p) => p.map(c => c.platforms.filter(pl => pl)))
        .then((l) => l.flat().filter((el, i, array) => {
            return i === array.indexOf(el)

        }));

}
/* [ 'hola' , 'chau' , 'bye', 'hola']
     I
       J

en la segunda vuelta realiza la misma comparacion tomando de referencia el indice del elemento, y no hay coincidencia  */
module.exports = {
    allVg,
    apiGames,
    apiPlatforms
}