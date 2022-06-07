/* const express = require("express"); */
const { Genre } = require("../db");
const { Router } = require("express");
const axios = require("axios");
const router = Router();
require("dotenv").config();
const { API_KEY } = process.env;

// los guardamos en la bd y los utilizamos desde aca

router.get('/', async (req, res) => {
  let apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  const genres = apiGenres.data.results.map(p => p.name)
  const genre1 = await genres.filter(p => p.length > 0);// por si hay vg q no tienen genero
  genre1.forEach(p => {
    if (p !== undefined) Genre.findOrCreate({ where: { name: p } })// si lo encuentra que me lo devuelva sino que lo agregue a la bd
  })
  const allGenres = await Genre.findAll();

  res.send(allGenres);
});
// PRACTICAR!!!!

/* router.post('/creategenre', async (req, res) => {
  try {
    const { name } = req.body;
    const newGenre = await Genre.findOrCreate({ ???????????????????????????????
      where: { name }
    })
    if (newGenre) res.status(200).json({ msg: 'genre created' })
  } catch (error) {
    console.log(error)
  }
})
 */
module.exports = router;