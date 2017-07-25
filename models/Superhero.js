const mongoose = require('mongoose')

const SuperheroSchema = new mongoose.Schema({
  name: String,
  superpower: String,
  img: String,
});

module.exports = mongoose.model('Superhero',SuperheroSchema);
