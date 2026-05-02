import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
const porta = process.env.SERVER_PORTA;

app.listen(porta, (error) => {
  if (error) {
    console.log(`🖥️  Erro ao iniciar servidor na porta ${porta}`);
    console.error(`🖥️  Error: ${error.message}`);
  } else {
    console.log(`🖥️  Server rodando na porta ${porta}`);
  }
});
