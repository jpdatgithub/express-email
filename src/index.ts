import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend TS funcionando!");
});

app.post("/send-contact", (req, res) => {
  console.log("Recebido:", req.body);
  res.json({ status: "ok", received: req.body });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Rodando na porta", port));
