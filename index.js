"use strict";

const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

// Dane przechowywane w pliku JS
let categories = ["funnyJoke", "lameJoke"];

let funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",
    response: "Bo złapał wirusa!",
  },
  {
    joke: "Dlaczego komputer nie może być głodny?",
    response: "Bo ma pełen dysk!",
  },
  {
    joke: "Co mówi jeden bit do drugiego?",
    response: "„Trzymaj się, zaraz się przestawiamy!”",
  },
];

let lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",
    response: "Bo w nocy jest mniej bugów do łapania!",
  },
  {
    joke: "Jak nazywa się bardzo szybki programista?",
    response: "Błyskawiczny kompilator!",
  },
];

// Mapowanie kategorii na listy dowcipów
const jokesMap = {
  funnyJoke: funnyJoke,
  lameJoke: lameJoke,
};

// Endpoint 1: zwraca listę kategorii
app.get("/jokebook/categories", (req, res) => {
  res.json(categories);
});

// Endpoint 2: zwraca losowy dowcip z wybranej kategorii
app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;

  if (!categories.includes(category)) {
    return res.status(400).json({ error: `no jokes for category ${category}` });
  }

  const jokes = jokesMap[category];
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];

  res.json(randomJoke);
});

const path = require('path');
app.use(express.static(path.join(__dirname, '/')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});