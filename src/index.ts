import express from "express";
import cors from "cors";
import "dotenv/config";

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;
const FRONT_URL = process.env.FRONT_URL!;
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors({
  origin: FRONT_URL,
  methods: ["POST"],
  allowedHeaders: ["Content-Type"],
}));

app.post("/enviar-contato", async (req, res) => {
  try {
    console.log("Recebido do front:", req.body);

    const resposta = await fetch(`${API_URL}/contato/psa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API-KEY": API_KEY
      },
      body: JSON.stringify(req.body)
    });

    const data = await resposta.json();

    return res.status(resposta.status).json(data);

  } catch (err) {
    console.error("Erro ao chamar API .NET:", err);
    return res.status(500).json({ error: "Erro interno", details: err });
  }
});

app.listen(port, () => console.log("Rodando na porta", port));
