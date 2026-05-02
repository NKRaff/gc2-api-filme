import express, { json } from "express"
import { filmes } from "./filmes.mock.js"
import { v7 } from "uuid"

const app = express()
app.use(express.json())

app.get('/api/filmes', (req, res) => {
  res.status(200).json(filmes)
})

app.post("/api/filmes", (req, res) => {
  const { titulo, ano, generos } = req.body
  if(titulo && ano && generos) {
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

export default app