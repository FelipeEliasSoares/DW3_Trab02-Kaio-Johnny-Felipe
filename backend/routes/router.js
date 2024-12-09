const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appContas = require("../apps/contas/controller/ctlContas");
const appMotoristas = require("../apps/motoristas/controller/ctlMotoristas");

const Me = require("../apps/middleware/auth");

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


/// Rotas de Motoristas
routerApp.get("/motoristas", Me, appMotoristas.GetAllMotoristas);
routerApp.get("/motoristas/:id", Me, appMotoristas.GetMotoristaByID);
routerApp.post("/motoristas", Me, appMotoristas.InsertMotorista);
routerApp.put("/motoristas/:id", Me, appMotoristas.UpdateMotorista);
routerApp.delete("/motoristas/:id", Me, appMotoristas.DeleteMotorista);

module.exports = routerApp;
