const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Superhero = require('./models/Superhero')
const app = express()
let port = 3000

mongoose.connect('mongodb://localhost/superheroes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/api',(req,res) => {
  Superhero.find((err, superheroes) => {
    if(err){
      res.send({message: err, data: null})
    }
    else{
      res.send({message: "Successfully retrieved heroes!", data: superheroes})
    }
  })
})

app.get('/api/:hero_id',(req,res) => {
  Superhero.findById(req.params.hero_id, (err, superhero) => {
    if(err){
      res.send({message: err, data: null})
    }
    else{
      res.send({message: "Successfully retrieved hero!", data: superhero})
    }
  })
})

app.post('/api', (req,res) => {

  // Create a new hero via Superhero constructor
  let newHero = new Superhero()

  newHero.name = req.body.name
  newHero.superpower = req.body.superpower
  newHero.img = req.body.img

  // Save and return new hero if no error
  newHero.save((err, newHero) => {
    if(err){
      res.send({message: err, data: null})
    }
    else{
      res.send({message: "Successfully created new hero!", data: newHero})
    }
  })
})


app.put('/api/:hero_id', (req,res) => {

  // Find our hero to update
  Superhero.findById(req.params.hero_id, (err, superhero) => {

    // If new data, then change value, else keep the same
    superhero.name = (req.body.name) ? req.body.name : superhero.name
    superhero.superpower = (req.body.superpower) ? req.body.superpower : superhero.superpower
    superhero.img = (req.body.img) ? req.body.img : superhero.img

    superhero.save((err, superhero) => {
      if(err){
        res.send({message: err, data: null})
      }
      else{
        res.send({message: `Successfully updated ${superhero.name}!`, data: superhero})
      }
    })
  })
})

app.delete('/api/:hero_id', (req,res) => {
  Superhero.remove({_id: req.params.hero_id}, (err) => {
    if(err){
      res.send({message: err, data: null})
    }
    else{
      res.send({message: "Superhero successfully deleted!", data: {}})
    }
  })
})

const server = app.listen(port,() => console.log(`Listening on port: ${port}`))
