const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const Me = require("../apps/middleware/auth");
const appUsuarios = require("../apps/usuarios/controller/ctlUsuarios");
const appVeiculos = require("../apps/veiculos/controller/ctlVeiculos");
routerApp.use((req, res, next) => {
  next();
});

// Rota raiz para teste
routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// Rotas de Autenticação
routerApp.post("/login", appLogin.Login);
routerApp.post("/logout", appLogin.Logout);
routerApp.get("/api/auth/me", Me, appLogin.Me);

// Rotas de Veiculos
routerApp.get("/veiculos", Me, appVeiculos.GetAllVeiculos);
routerApp.get("/veiculos/:id", Me, appVeiculos.GetVeiculosByID);
routerApp.post("/veiculos", Me, appVeiculos.InsertVeiculo);
routerApp.put("/veiculos/:id", Me, appVeiculos.UpdateVeiculo);
routerApp.delete("/veiculos/:id", Me, appVeiculos.DeleteVeiculo);

// Rotas de Usuários
routerApp.get("/usuarios", Me, appUsuarios.GetAllUsuarios);
routerApp.get("/usuarios/:id", Me, appUsuarios.GetUsuarioByID);
routerApp.post("/usuarios", Me, appUsuarios.InsertUsuario);
routerApp.put("/usuarios/:id", Me, appUsuarios.UpdateUsuario);
routerApp.delete("/usuarios/:id", Me, appUsuarios.DeleteUsuario);

module.exports = routerApp;
