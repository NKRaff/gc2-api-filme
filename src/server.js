import express, { json } from "express"
import { configDotenv } from "dotenv"
import { filmes } from "./filmes.mock.js"
import { v7 } from "uuid"

const app = express()
const porta = process.env.SERVER_PORTA || 3000

app.use(express.json())

app.post("/api/filmes", (req, res) => {
  const { titulo, ano, generos } = req.body
  if(titulo, ano, generos) {
    const filme = {
      id: v7(),
      titulo,
      ano,
      generos
    }

    filmes.push(filme)

    return res.status(201).json({message: "Filme cadastrado com sucesso"})
  }
  return res.status(400).json({error: "Campos obrigatórios: titulo, ano e generos"})
})

app.listen(porta, (error) => {
  if(error) {
    console.log(`🖥️  Erro ao iniciar servidor na porta ${porta}`)
    console.error(`🖥️  Error: ${error.message}`)
  } else {
    console.log(`🖥️  Server rodando na porta ${porta}`)
  }
})