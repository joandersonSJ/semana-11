const express = require('express');
const routes = require('./routes');
const cors =     require('cors');

const app =              express();

const informacoes = {
  porta: 3333,
  estado: "ativo"
}


app.use(cors())
app.use(express.json());
app.use(routes);




app.listen(3333,
console.table(
  informacoes
))