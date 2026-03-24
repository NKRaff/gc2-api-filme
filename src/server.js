import express, { json } from "express"
import { configDotenv } from "dotenv"
import { filmes } from "./filmes.mock.js"

const app = express()
const porta = process.env.SERVER_PORTA || 3000

app.get('/api/filmes', (req, res) => {
  res.status(200).json(filmes)
})

app.use(express.json())
app.listen(porta, (error) => {
  if(error) {
    console.log(`🖥️  Erro ao iniciar servidor na porta ${porta}`)
    console.error(`🖥️  Error: ${error.message}`)
  } else {
    console.log(`🖥️  Server rodando na porta ${porta}`)
  }
})