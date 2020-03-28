const app = require('./app')

const informacoes = {
  porta: 3333,
  estado: "ativo"
}

app.listen(3333,
  console.table(
    informacoes
))