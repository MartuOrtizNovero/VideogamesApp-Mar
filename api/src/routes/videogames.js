const { allVg, apiPlatforms } = require('../controllers/videogames')
const { Videogame, Genre } = require("../db");
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { API_KEY } = process.env;

router.get('/', async (req, res) => {
  const name = req.query.name;
  const videogamesTotal = await allVg();
  if (name) {
    const videogameName = videogamesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    videogameName.length
      ? res.status(200).send(videogameName)
      : res.status(404).send("Videogame not found");
  } else {
    return res.status(200).send(videogamesTotal);
  }
});

router.get('/platforms', async (req, res) => {
  const platformsTotal = await apiPlatforms();
  platformsTotal.length > 0
    ? res.status(200).send(platformsTotal)
    : res.status(404).send("not platforms founded")
});

router.post('/', async (req, res) => {
  const { name, description, releaseDate, rating, platforms, img, genres, createdInDb } = req.body;
  if (!name || !description || !platforms) res.status(400).json({ msg: "insuficient filled data" })
  try {
    let newGame = await Videogame.create({
      name,
      description,
      releaseDate,
      rating,
      platforms,
      img: img ? img : 'https://i.pinimg.com/originals/18/e8/c7/18e8c725fe3acbef073232b332d77eee.gif',
      createdInDb
    })

    let genresDb = await Genre.findAll({
      where: { name: genres }
    })
    newGame.addGenre(genresDb)
    res.send('Videogame created')
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes('-')) {
      let gamesId = await Videogame.findByPk(id, {
        include: Genre,
      })
      if (gamesId) return res.status(200).send(gamesId);
    } else {
      const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
      const info = {
        id: game.data.id,
        name: game.data.name,
        img: game.data.background_image_additional,
        genres: game.data.genres.map(g => g.name),
        platforms: game.data.platforms.map(p => p.platform.name),
        description: game.data.description_raw,
        rating: game.data.rating,
        releaseDate: game.data.released,
        playtime: game.data.playtime
      }
      return res.status(200).send(info);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;