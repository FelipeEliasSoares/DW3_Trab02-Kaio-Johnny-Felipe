const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const router = require("./routes/router");

const app = express();
const port = 4000;

// Configurar CORS para permitir requisições de http://localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000", // Permitir apenas este origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Permitir envio de cookies
  })
);

// Middleware para parsear cookies
app.use(cookieParser());

// Middleware para parsear JSON e URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


//@ Utiliza o routerApp configurado em ./routes/router.js
app.use(router);

// Middleware para lidar com rotas não definidas
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
