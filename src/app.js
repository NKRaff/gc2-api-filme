import express from "express";
import { v7 } from "uuid";
import { filmes } from "../data/filmes.mock";

const app = express();
app.use(express.json());

app.get("/api/filmes", (_req, res) => {
  res.status(200).json(filmes);
});

app.post("/api/filmes", (req, res) => {
  const { titulo, ano, generos } = req.body;
  if (titulo && ano && generos) {
    const filme = {
      id: v7(),
      titulo,
      ano,
      generos,
    };

    filmes.push(filme);

    return res.status(201).json({ message: "Filme cadastrado com sucesso" });
  }
  return res
    .status(400)
    .json({ error: "Campos obrigatórios: titulo, ano e generos" });
});

app.delete("/api/filmes/:id", (req, res) => {
  const filmeId = req.params.id;
  const filme = filmes.find((f) => f.id === filmeId);

  if (!filme) {
    return res.status(404).json({ error: "Filme não encontrado" });
  }

  filmes.splice(filmes.indexOf(filme), 1);
  return res.sendStatus(204);
});

export default app;
