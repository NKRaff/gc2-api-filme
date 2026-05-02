import request from "supertest"
import app from "../src/app.js"
import { filmes } from "../src/filmes.mock.js"

beforeEach(() => {
  filmes.length = 0
  filmes.push({
    id: "1",
    titulo: "A Volta dos que Não Foram",
    ano: 1999,
    generos: ["Comédia", "Aventura"]
  })
})

describe("API de filmes", () => {
  it("GET /api/filmes deve retornar lista", async () => {
    const res = await request(app).get("/api/filmes")

    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("POST /api/filmes deve cadastrar filme", async () => {
    const res = await request(app)
      .post("/api/filmes")
      .send({
        titulo: "As Tranças do Rei Careca",
        ano: 2005,
        generos: ["Comédia", "Fantasia"]
      })
      
    expect(res.statusCode).toBe(201)
    expect(res.body.message).toBeDefined()
  })

  it("POST /api/filmes não deve cadastrar sem dados", async () => {
    const res = await request(app)
      .post("/api/filmes")
      .send({})

    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBeDefined()
  })

  it("DELETE /api/filmes/:id deve remover filme", async () => {
    const res = await request(app).delete("/api/filmes/1")

    expect(res.statusCode).toBe(204)
  })

  it("DELETE /api/filmes/:id não deve remover quando id invalido", async () => {
    const res = await request(app).delete("/api/filmes/idinvalido")
    
    expect(res.statusCode).toBe(404)
    expect(res.body.error).toBeDefined()
  })
})